const net = require('net')
const peerEvents = require('./peer-events.js')

class Server {
    constructor({ host = 'localhost', port = 8080 }) {
        this.servername = `${host}:${port}`
        this.server = net.createServer(peer => {
            let { localAddress, localPort } = peer
            console.log(`new connection to ${localAddress}:${localPort}`)
            this.mapPeerEvents(peer)
            this.peers.push(peer)
        })
        this.peers = []
        this.port = port
        this.server.listen(port)
    }

    broadcast(data) {
        this.peers.forEach(p => {
            p.write(`> ${data}`)
        })
    }

    addPeer({ host, port = 8888 }) {
        let peer = net.createConnection(port, host, () => {
            console.log('new connection created')
        })
        this.mapPeerEvents(peer)
        this.peers.push(peer)
    }

    mapPeerEvents(peer) {
        for (let e in peerEvents) {
            peer.on(e, peerEvents[e])
        }
    }
}

module.exports = Server
