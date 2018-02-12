const moment = require('moment')
const sha256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index 
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash() {
        let dataString = JSON.stringify(this.data)
        return sha256(`${this.index}${this.previousHash}${this.timestamp}${dataString}${this.nonce}`).toString()
    }

    mine(difficulty) {
        // calculate hash until the first difficulty characters are '0'
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++
            this.hash = this.calculateHash()
        }

        console.log(`\u26cf Block #${this.index} mined: ${this.hash}`)
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 2
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
        newBlock.mine(this.difficulty)
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
console.log('Mining block #1...')
blockchain.addBlock({ data: 'First block' })

console.log('Mining block #2...')
blockchain.addBlock({ data: 'Second block' })
console.log('Mining block #3...')
blockchain.addBlock({ data: 'Third block' })
