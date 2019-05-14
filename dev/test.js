// Import Blockchain constructor
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain(); // constructor

const bc1 =
{
   chain: [
   {
   "index": 1,
   "timestamp": 1557816244370,
   "transactions": [ ],
   "nonce": 100,
   "hash": "0",
   "previousBlockHash": "0"
   },
   {
   "index": 2,
   "timestamp": 1557816286764,
   "transactions": [ ],
   "nonce": 18140,
   "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
   "previousBlockHash": "0"
   },
   {
   "index": 3,
   "timestamp": 1557816287784,
   "transactions": [
   {
   "amount": 12.5,
   "sender": "00",
   "recipient": "aa372e30761311e9849fc920668a033a",
   "transactionId": "c37f5930761311e9849fc920668a033a"
   }
   ],
   "nonce": 147321,
   "hash": "00003f8ad90bb4e60ce1c90394b5f9dae84ef9bdb6b08d0b256c4cd24e09e494",
   "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
   },
   {
   "index": 4,
   "timestamp": 1557816444962,
   "transactions": [
   {
   "amount": 12.5,
   "sender": "00",
   "recipient": "aa372e30761311e9849fc920668a033a",
   "transactionId": "c417c8a0761311e9849fc920668a033a"
   },
   {
   "amount": 100,
   "sender": "NNFANSDFHYHTN90A09SNFAS",
   "recipient": "IUW099N0A90WENNU234UFAW",
   "transactionId": "179ba2d0761411e9849fc920668a033a"
   }
   ],
   "nonce": 82518,
   "hash": "0000a7e647899918a9967cdfd0ccafd956d2ddf6ba0df86ead8047832c26374a",
   "previousBlockHash": "00003f8ad90bb4e60ce1c90394b5f9dae84ef9bdb6b08d0b256c4cd24e09e494"
   },
   {
   "index": 5,
   "timestamp": 1557816445448,
   "transactions": [
   {
   "amount": 12.5,
   "sender": "00",
   "recipient": "aa372e30761311e9849fc920668a033a",
   "transactionId": "21c91300761411e9849fc920668a033a"
   }
   ],
   "nonce": 68659,
   "hash": "00002f70813cc058ecbedf2b31a2bdeee895f147b551b31f2fe711d6ab95b720",
   "previousBlockHash": "0000a7e647899918a9967cdfd0ccafd956d2ddf6ba0df86ead8047832c26374a"
   }
   ],
   "pendingTransactions": [
   {
   "amount": 12.5,
   "sender": "00",
   "recipient": "aa372e30761311e9849fc920668a033a",
   "transactionId": "221166a0761411e9849fc920668a033a"
   }
   ],
   "currentNodeUrl": "http://localhost:3001",
   "networkNodes": [ ]
};

console.log('VALID:',bitcoin.chainIsValid(bc1.chain));

//console.log(bitcoin);

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

/* Test Case : Hash & Proof of Work generation
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
*/