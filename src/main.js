const { Blockchain, Transaction } = require('./blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('generate your private key and paste here'); //TODO
const myWalletAddress = myKey.getPublic('hex');

let jsCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10); //TODO

console.log('--> Is chain valid? ', jsCoin.isChainValid());

tx1.signTransaction(myKey);
jsCoin.addTransaction(tx1);

console.log('\n--> Starting the miner...');
jsCoin.minePendingTransactions(myWalletAddress);

console.log('\n--> Your balance is: ', jsCoin.getBalanceOfAddress(myWalletAddress));

//Try to change manually the amount after transaction processed
jsCoin.chain[1].transactions[0].amount = 1;

console.log('--> Is chain valid? ', jsCoin.isChainValid());