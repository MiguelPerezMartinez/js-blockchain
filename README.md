<h3 align="center">JS Blockchain Test</h3>

<div align="center">

  [![.github/workflows/ci.yml](https://github.com/Savjee/SavjeeCoin/actions/workflows/ci.yml/badge.svg)](https://github.com/Savjee/SavjeeCoin/actions/workflows/ci.yml)
  [![Coverage Status](https://coveralls.io/repos/github/Savjee/SavjeeCoin/badge.svg?branch=master)](https://coveralls.io/github/Savjee/SavjeeCoin?branch=master)
  [![GitHub Issues](https://img.shields.io/github/issues/Savjee/SavjeeCoin.svg)](https://github.com/Savjee/SavjeeCoin/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Savjee/SavjeeCoin.svg)](https://github.com/Savjee/SavjeeCoin/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

*⚠️ For education purposes only. This is by no means a complete implementation and it is by no means secure!*

## Features

* Simple proof-of-work algorithm
* Verify blockchain (to prevent tampering)
* Generate wallet (private/public key)
* Sign transactions

## 🏁 Getting Started <a name = "getting_started"></a>

### Generate a keypair
To make transactions on this blockchain you need a keypair. The public key becomes your wallet address and the private key is used to sign transactions.

```js
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.genKeyPair();
```

The `myKey` object now contains your public & private key:

```js
console.log('Public key:', myKey.getPublic('hex'));
console.log('Private key:', myKey.getPrivate('hex'));
```

### Create a blockchain instance
Now you can create a new instance of a Blockchain:

```js
const {Blockchain, Transaction} = require('js-blockchain');

const myChain = new Blockchain();
```

### Adding transactions
```js
// Transfer 100 coins from my wallet to "toAddress"
const tx = new Transaction(myKey.getPublic('hex'), 'toAddress', 100);
tx.signTransaction(myKey);

myChain.addTransaction(tx);
```

To finalize this transaction, we have to mine a new block. We give this method our wallet address because we will receive a mining reward:

```js
myChain.minePendingTransactions(myKey.getPublic('hex'));
```
