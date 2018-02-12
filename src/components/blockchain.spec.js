const expect = require('chai').expect
const Blockchain = require('./blockchain')

genesis

describe('blockchain', function () {
    before(function () {
        this.blockchain = new Blockchain()
    })

    describe('constructor', function () {
        it('should create a genesis block', function () {
            let genesisBlock = this.blockchain.getLatestBlock().transactions
            expect(genesisBlock).to.have.lengthOf(0)
        })
        it('should have no pending transactions', function () {
            expect(this.blockchain.pendingTransactions).to.have.lengthOf(0)
        })
    })
})