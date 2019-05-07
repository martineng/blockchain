const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];

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
   } // END createNewTransaction

   this.pendingTransactions.push(newTransaction);
   return this.getLastBlock()['index'] + 1;
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

module.exports = Blockchain;
