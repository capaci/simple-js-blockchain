const moment = require('moment')

const Blockchain = require('./components/blockchain')
let Server = require('./server')

let serverA = new Server({host: 'localhost', port: 8080})
let serverB = new Server({host: 'localhost', port: 8081})
let serverC = new Server({host: 'localhost', port: 8082})

/** server */
serverA.addPeer({ host: 'localhost', port: 8081 })
serverA.addPeer({ host: 'localhost', port: 8082 })
serverB.addPeer({ host: 'localhost', port: 8082 })

serverA.server.getConnections((err, x) => {
    console.log(x)
})
serverB.server.getConnections((err, x) => {
    console.log(x)
})
serverC.server.getConnections((err, x) => {
    console.log(x)
})
serverA.broadcast('asdfasfsadf')


/** blockchain */
let blockchain = new Blockchain()
blockchain.createTransaction('addr1', 'addr2', 10, {})
blockchain.createTransaction('addr2', 'addr1', 5, {})
console.log('\nStarting the miner...')
blockchain.minePendingTransactions('addr1')
console.log('Balance of addr1 = ', blockchain.balanceOf('addr1'))

console.log('\nStarting the miner again...')
blockchain.minePendingTransactions('addr1')
console.log('Balance of addr1 = ', blockchain.balanceOf('addr1'))