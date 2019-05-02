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
   }
}