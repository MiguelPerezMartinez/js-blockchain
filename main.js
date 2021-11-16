const SHA256 = require('crypto-js/sha256')

class Block{
  constructor(index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(){
    return new Block(0, '16/11/2021', 'Genesis block', '0');
  }

  getLastestBlock(){
    return this.chain[this.chain.length -1];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLastestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  //Check the integrity of the chain
  isChainValid(){
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }

    return true;
  }
}

let jsCoin = new Blockchain();
jsCoin.addBlock(new Block(1, '13/11/2021', { amount: 10 }));
jsCoin.addBlock(new Block(2, '15/11/2021', { amount: 30 }));

console.log('Is blockchain valid? -> ' + jsCoin.isChainValid());

console.log(JSON.stringify(jsCoin, null, 4));