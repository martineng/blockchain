const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
const uuid = require('uuid/v1');
const nodeAddress = uuid().split('-').join('');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
   res.send('Hello Friend');
});

app.get('/blockchain', function(req, res){
   res.send(bitcoin);
});

app.post('/transaction', function(req, res){
   //console.log(req.body);
   //res.send(`The amount of the transaction is ${req.body.amount} bitcoin.`);

   const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
   res.json({ note: `Transaction will be added in block ${blockIndex}.`});
});

app.get('/mine', function(req, res){

   const lastBlock = bitcoin.getLastBlock();
   const previousBlockHash = lastBlock['hash'];

   const currentBlockData = {
      transactions: bitcoin.pendingTransactions,
      index: lastBlock['index'] + 1,
   };

   const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

   const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

   const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

   res.json({
      note: "New block mined successfully",
      block: newBlock,
   });

   bitcoin.createNewTransaction(12.5, "00", nodeAddress);

});

// Serve is listening to port 3000
app.listen(3000, function(){
   console.log('listening on port 3000...');
}); 