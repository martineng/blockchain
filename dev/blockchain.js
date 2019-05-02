function Blockchain(){
   this.chain = [];
   this.newTransactions = [];

   // Create new block
   Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
      // New block inside BlockChain.
      // Evething will be stored inside this block
      const newBlock = {
         index: this.chain.length + 1,
         timestamp: Date.now(),
         transactions: this.newTransactions,
         nonce: nonce,
         hash: hash,
         previousBlockHash: previousBlockHash,
      };

      this.newTransaction = [];
      return newBlock;
   }  // END createNewBlock

   Blockchain.prototype.getLastBlock = function(){
      return this.chain[this.chain.length - 1];
   }

   Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
      const newTransaction = {
         amount: amount,
         sender: sender,
         recipient: recipient,
      }

      this.newTransaction.push(newTransaction);
   } // END createNewTransaction

} // END Blockchain()

module.exports = Blockchain;
