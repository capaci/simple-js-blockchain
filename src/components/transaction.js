class Transaction {
    constructor(from, to, amount, data) {
        this.from = from
        this.to = to
        this.amount = amount
        this.data = data
    }
}

module.exports = Transaction