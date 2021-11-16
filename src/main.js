const { Blockchain, Transaction } = require('./blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('0419c028536efd9f53069932425c3d292cedc92188243b5d7266b6280cf2de50f3daaafc7251032769e81a2357bc9d78249fbff07374878fcaa91b4b5a7b5b1640');
const myWalletAddress = myKey.getPublic('hex');

let jsCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);

console.log('--> Is chain valid? ', jsCoin.isChainValid());

tx1.signTransaction(myKey);
jsCoin.addTransaction(tx1);

console.log('\n--> Starting the miner...');
jsCoin.minePendingTransactions(myWalletAddress);

console.log('\n--> Balance of Miguel is: ', jsCoin.getBalanceOfAddress(myWalletAddress));

//Try to change manually the amount after transaction processed
jsCoin.chain[1].transactions[0].amount = 1;

console.log('--> Is chain valid? ', jsCoin.isChainValid());