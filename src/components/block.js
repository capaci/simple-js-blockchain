const sha256 = require('crypto-js/sha256')

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp
        this.transactions = transactions
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash() {
        let transactionsString = JSON.stringify(this.transactions)
        return sha256(`${this.index}${this.previousHash}${this.timestamp}${transactionsString}${this.nonce}`).toString()
    }

    mine(difficulty) {
        // calculate hash until the first difficulty characters are '0'
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++
            this.hash = this.calculateHash()
        }

        console.log(`\u26cf Block mined: ${this.hash}`)
    }
}

module.exports = Block