const Block = require('./Block')
const Transaction = require('./Transaction')
const moment = require('moment')

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 2
        this.pendingTransactions = []
        this.miningReward = 666
    }

    createGenesisBlock() {
        return new Block(moment().unix(), [], 0x0)
    }

    getLatestBlock()  {
        return this.chain[this.chain.length - 1]
    }

    minePendingTransactions(miningRewardAddress) {
        let previousHash = this.getLatestBlock().hash
        let block = new Block(moment().unix(), this.pendingTransactions, previousHash)
        block.mine(this.difficulty)
        this.chain.push(block)

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward, {})
        ]
    }

    createTransaction(from, to, amount, data) {
        this.pendingTransactions.push(new Transaction(from, to, amount, data))
    }

    balanceOf(address) {
        let balance = 0
        for (const block of this.chain) {
            for (const t of block.transactions) {
                if (t.from === address) balance -= t.amount
                if (t.to === address) balance += t.amount
            }
        }
        return balance
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