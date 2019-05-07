const port = process.argv[2];
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');

const bitcoin = new Blockchain();
const nodeAddress = uuid().split('-').join('');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Front Page
app.get('/', function(req, res){
   res.send('Basic Blockchain written in Javascript');
});

// Send the entire Blockchain to endpoint
app.get('/blockchain', function(req, res){
   res.send(bitcoin);
});

// Send the Transaction result in blockIndex
app.post('/transaction', function(req, res){
   const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
   res.json({ note: `Transaction will be added in block ${blockIndex}.`});
});

// Mine and send new block info
app.get('/mine', function(req, res){
   // Get the previous hash
   const lastBlock = bitcoin.getLastBlock();
   const previousBlockHash = lastBlock['hash'];

   // Current block consists Transactions and index of this block
   const currentBlockData = {
      transactions: bitcoin.pendingTransactions,
      index: lastBlock['index'] + 1,
   };

   // Using proofOfWork and previous & current node to generate nocne
   const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

   // Create hash
   const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
   const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

   res.json({
      note: "New block mined successfully",
      block: newBlock,
   });

   // Reward for miner who found and create this new block
   bitcoin.createNewTransaction(12.5, "00", nodeAddress);

});

// Serve is listening to port
app.listen(port, function(){
   console.log(`listening on port ${port}...`);
}); 