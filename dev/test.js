//Import Blockchain constructor
const Blockchain = require('./blockchain');

// Testing the Blockchain constructor function
const bitcoin = new Blockchain();

bitcoin.createNewBlock(2389, 'OIUOEREDHKHKD', '78s97d4x6dsf');
bitcoin.createNewTransaction(100, 'ALEXHT845SJ5TKCJ2', 'JENN5BG5DF6HT8NG9');

console.log(bitcoin);