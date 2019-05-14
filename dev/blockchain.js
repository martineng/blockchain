const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid/v1');

function Blockchain(){
   this.chain = [];
   this.pendingTransactions = [];
   this.currentNodeUrl = currentNodeUrl;
   this.networkNodes = [];
   this.createNewBlock(100, '0', '0'); // Genesis Block
} // END Blockchain


// Create new block
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
   // New block inside BlockChain.
   // Evething will be stored inside this block
   const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce: nonce,
      hash: hash,
      previousBlockHash: previousBlockHash,
   };

   this.pendingTransactions = [];
   this.chain.push(newBlock);
   return newBlock;
}  // END createNewBlock

Blockchain.prototype.getLastBlock = function(){
   return this.chain[this.chain.length - 1];
} // END getLastBlock

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
   const newTransaction = {
      amount: amount,
      sender: sender,
      recipient: recipient,
      transactionId: uuid().split('-').join(''),
   } // END createNewTransaction

   //this.pendingTransactions.push(newTransaction);
   //return this.getLastBlock()['index'] + 1;

   return newTransaction;
} // END createNewTransaction


Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
   
   // Convert info into string
   const dataString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
   const hash = sha256(dataString);
   
   return hash;
} // END hashBlock

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
   // Using let as our variables will be changing through the process
   let nonce =0;
   let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

   // If the generated hash doesn't start with 4 zero, hash again with different nonce.
   while (hash.substring(0, 4) != '0000'){
      nonce++;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
   }

   return nonce;
} // END proofOfWork

Blockchain.prototype.addTransactionToPendingTransaction = function(transactionObj){
   this.pendingTransactions.push(transactionObj);
   return this.getLastBlock()['index'] + 1;
};

Blockchain.prototype.chainIsValid = function(blockchain){
   let validChain = true;
   
   for (var i = 1; i< blockchain.length; i++){
      const currentBlock = blockchain[i];
      const previousBlock = blockchain[i - 1];
      
      // Rehash every block to make sure that each hash starts with four 0.
      const blockHash = this.hashBlock(previousBlock['hash'], {
         transactions: currentBlock['transactions'],
         index: currentBlock['index']
      }, currentBlock['nonce'] );
      
      // The hash no started with four 0.
      if (blockHash.substring(0, 4) !== '0000') validChain = false;

      if (currentBlock['previousBlockHash'] !== previousBlock['hash']) validChain = false;

      //console.log('previousBlockHash =>', previousBlock['hash']);
      //console.log('currentBlockHash =>', currentBlock['hash']);
   }; // END for

   const genesisBlock = blockchain[0];

   // Check and verify the properties on genesis block
   const correctNonce = genesisBlock['nonce'] === 100;
   const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
   const correctHash = genesisBlock['hash'] === '0';
   const correctTransactions = genesisBlock['transactions'].length === 0;

   if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions){
      validChain = false;
   };

   return validChain;
};


module.exports = Blockchain;
