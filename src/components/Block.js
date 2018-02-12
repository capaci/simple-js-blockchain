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

module.exports = Block