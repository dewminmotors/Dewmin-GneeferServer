const db = require("../models")
const StockLog = db.stockLog

exports.create = (req, res) => {

    const stockLog = new StockLog({
        stockLog: req.body.stockLog
    })

    stockLog
        .save(stockLog)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the stock Log data"
            })
        })
}