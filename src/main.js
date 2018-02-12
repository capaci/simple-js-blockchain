const moment = require('moment')

const Blockchain = require('./components/Blockchain')

let blockchain = new Blockchain()
blockchain.createTransaction('addr1', 'addr2', 10, {})
blockchain.createTransaction('addr2', 'addr1', 5, {})
console.log('\nStarting the miner...')
blockchain.minePendingTransactions('addr1')
console.log('Balance of addr1 = ', blockchain.balanceOf('addr1'))

console.log('\nStarting the miner again...')
blockchain.minePendingTransactions('addr1')
console.log('Balance of addr1 = ', blockchain.balanceOf('addr1'))