const Block = require('./Block')
const moment = require('moment')

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

module.exports = Blockchain