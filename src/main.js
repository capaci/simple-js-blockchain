const moment = require('moment')

const Blockchain = require('./components/Blockchain')

let blockchain = new Blockchain()
console.log('Mining block #1...')
blockchain.addBlock({ data: 'First block' })
console.log('Mining block #2...')
blockchain.addBlock({ data: 'Second block' })
console.log('Mining block #3...')
blockchain.addBlock({ data: 'Third block' })
