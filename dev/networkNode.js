const port = process.argv[2];
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const rp = require('request-promise');

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
   //const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
   const newTransaction = req.body;
   const blockIndex = bitcoin.addTransactionToPendingTransaction(newTransaction);

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
}); // END .get(mine)

// Register new nodes itself then broadcast the new node to all other nodes
app.post('/register-and-broadcast-node', function(req, res){
   const newNodeUrl = req.body.newNodeUrl;
   
   // IF no newNodeUrl
   if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);

   const regNodesPromises = [];

   // Register Node Url, request and return promises in an array
   bitcoin.networkNodes.forEach(networkNodeUrl => {
      const requestOptions = {  
         uri: networkNodeUrl + '/register-node',
         method: 'POST',
         body: { newNodeUrl: newNodeUrl },
         json: true
      };
      regNodesPromises.push(rp(requestOptions));
   });

   // Spread out all elements of this array and put inside an outer array
   Promise.all(regNodesPromises)
   .then(data=>{ // .then will execute after promises completed. data = recieved data
      const bulkRegisterOptions = {
         uri: newNodeUrl + '/register-nodes-bulk',
         method: 'POST',
         body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
         json: true
      };

      return rp(bulkRegisterOptions);
   })
   .then (data=>{
      res.json({ note: 'New node registered with network successfully. '});
   });
}); // END .post(register-and-broadcast-node)

// receive broadcast, register newn node with request
app.post('/register-node', function(req, res){
   const newNodeUrl = req.body.newNodeUrl;
   const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
   const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;

   // Error handling, check if not exist, push newNodeUrl to curent networkNodes array
   if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
 
   res.json({ note: 'New node registered successfully.'});
});

// When new node get broadcaste, take all existing nodes and send data to new node
// to register and recognize all existing nodes
app.post('/register-nodes-bulk', function(req, res){
   const allNetworkNodes = req.body.allNetworkNodes;
   
   allNetworkNodes.forEach(networkNodeUrl => {   
      const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
      const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;

      if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
   });

   res.json({note: 'Bulk registration successful.'});
});

app.post('/transaction/broadcast', function(req, res){
   const newTransaction = bitcoin.createNewTransaction(req.body.amount,
      req.body.sender, req.body.recipient);
   const requestPromises = [];
   bitcoin.addTransactionToPendingTransaction(newTransaction);
   
   bitcoin.networkNodes.forEach(networkNodeUrl => {
      const requestOptions = {
         uri: networkNodeUrl + '/transaction',
         method: 'POST',
         body: newTransaction,
         json: true
      };
      requestPromises.push(rp(requestOptions));
   }); // END forEach
   
   Promise.all(requestPromises)
   .then(data => {
      res.json({note: 'Transaction created and broadcast successfully.'})
   });
});


// Serve is listening to port
app.listen(port, function(){
   console.log(`listening on port ${port}...`);
}); 