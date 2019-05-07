const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
   res.send('Hello Friend');
});

app.get('/blockchain', function(req, res){
   res.send(bitcoin);
});

app.post('/transaction', function(req, res){
   console.log(req.body);

   res.send(`The amount of the transaction is ${req.body.amount} bitcoin.`);
});

app.get('/mine', function(req, res){
});

// Serve is listening to port 3000
app.listen(3000, function(){
   console.log('listening on port 3000...');
}); 