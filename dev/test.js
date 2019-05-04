//Import Blockchain constructor
const Blockchain = require('./blockchain');

// Testing the Blockchain constructor function
const bitcoin = new Blockchain();

/* Test Case : New Transaction
bitcoin.createNewBlock(789457,'OIUOEDJETH8754DHKD','78SHNEG45DER56');
bitcoin.createNewTransaction(100,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');

bitcoin.createNewBlock(548764,'AKMC875E6S1RS9','WPLS214R7T6SJ3G2');

bitcoin.createNewTransaction(500,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
bitcoin.createNewTransaction(200,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
bitcoin.createNewTransaction(300,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');

console.log("----------------------------------");
console.log(bitcoin);
console.log("----------------------------------");
console.log(bitcoin.chain[0]);
console.log("----------------------------------");
console.log(bitcoin.chain[1]);
console.log("----------------------------------");
*/

const previousBlockHash = '87765DA6CCF0668238C1D27C35692E11';

const currentBlockData = [
   {
      amount: 10,
      sender: 'B4CEE9C0E5CD571',
      recipient: '3A3F6E462D48E9',
   },
   {
      amount: 20,
      sender: 'C4CEE9C0E5CD571',
      recipient: '4A3F6E462D48E9',
   },
   {
      amount: 30,
      sender: 'D4CEE9C0E5CD571',
      recipient: '5A3F6E462D48E9',
   },
]

//console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));
console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 0));