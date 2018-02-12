const moment = require('moment')
const sha256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }

    calculateHash() {
        let dataString = JSON.stringify(this.data)
        return sha256(`${this.index}${this.previousHash}${this.timestamp}${dataString}`).toString()
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        return new Block(0, moment().unix(), { name: 'Genesis Block' }, '0')
    }

    getLatestBlock()  {
        return this.chain[this.chain.length - 1]
    }

    addBlock({ data }) {
        let previousHash = this.getLatestBlock().hash
        let newBlock = new Block(this.chain.length, moment().unix(), data, previousHash)
        this.chain.push(newBlock)
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const previous = this.chain[i - 1]
            const current = this.chain[i]

            if (current.hash !== current.calculateHash()) {
                return false
            }

            if (current.previousHash !== previous.hash) {
                return false
            }

            return true
        }
    }
}

let blockchain = new Blockchain()
blockchain.addBlock({ data: 'First block' })
blockchain.addBlock({ data: 'Second block' })
blockchain.addBlock({ data: 'Third block' })
console.log(JSON.stringify(blockchain, null, 2))
console.log('Is valid blockchain => ', blockchain.isChainValid())
