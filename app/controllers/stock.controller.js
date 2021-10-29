const db = require("../models")
const Stock = db.stock
const Item = db.item
const Branch = db.branch
const Category = db.category
const Uplog = db.uplog
const StockLog = db.stockLog

exports.create = (req, res) => {
    if (!req.body.branchCode) {
        res.status(400).send({ message: "Content can not be empty!" })
        return
    }
    const stock = new Stock({
        branchCode: req.body.branchCode,
        itemId: req.body.itemId,
        cost: req.body.cost,
        price: req.body.price,
        disValue: req.body.disValue,
        name: req.body.name,
        brandName: req.body.brandName,
        currentStock: req.body.currentStock,
        stockVal: (req.body.cost * req.body.currentStock),
        available: true
    })
    stock
        .save(stock)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the stock."
            })
        })
}

exports.findByBrandBranch = (req, res) => {

    stockReportAr = []
    const branchCode = req.params.branch
    const category = req.params.brand
    console.log(req.query)
    var condition = branchCode ? {
        branchCode: branchCode
    } : {}

    Stock.find(condition)
        .populate('itemId')
        .then((data) => {
            console.log(data)

            stockReport = []

            stockReportArr = []

            let stockRep = { product: '', currentStock: '', price: '' }
            data.forEach(stockEntry => {
                if (!stockEntry.itemId || stockEntry.itemId === null) return
                if (stockEntry.itemId.catName == category && stockEntry.itemId._active == true) {
                    stockReport[stockEntry.itemId.name + stockEntry.itemId.price] = stockEntry.currentStock


                    stockReportArr = { product: stockEntry.itemId.name, price: stockEntry.itemId.price, currentStock: stockEntry.currentStock }
                    stockReportAr.push(stockReportArr)
                    console.log(stockReportAr)
                }

            })
            res.send(data)


            //res.send(Object.assign({}, stockReport))
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            })
        })
}

exports.findByBranchCode = (req, res) => {
    const branchCode = req.params.bc
    console.log(req.query)
    var condition = branchCode ? {
        branchCode: branchCode
    } : {}
    Stock.find(condition)
        .populate('_id')
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            })
        })
}

exports.findByItemId = (req, res) => {
    const itemId = req.params.itemId
    console.log(req.query)
    var condition = itemId ? {
        itemId: itemId
    } : {}
    Stock.find(condition)
        //.populate('iId')
        .then((data) => {
            let stock = {
                branchCode: data[0].branchCode,
                itemId: data[0].itemId,
                cost: data[0].cost,
                name: data[0].name,
                stockval: data[0].stockVal,
                brandName: data[0].brandName,
                currentStock: data[0].currentStock,
                available: data[0].available
            }
            res.send(stock)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving stock."
            })
        })
        //     items = []
        //     const itemId = req.params.itemId
        //     console.log(req.query)
        //     let condition = itemId ? {
        //         itemId: itemId
        //     } : {}
        //     Stock.find(condition)
        //         .then((data) => {
        //             const id = req.params.itemId
        //             console.log(data)
        //             let stockDetails = {
        //                 branchCode: data[0].branchCode,
        //                 itemId: data[0].itemId,
        //                 currentStock: data[0].currentStock,
        //                 available: data[0].available
        //             }
        //             Item.findById(id)
        //                 .then(itemData => {
        //                     stockDetails.catName = itemData.catName
        //                     stockDetails.itemName = itemData.name
        //                     console.log(products)
        //                     if (!itemData) res.status(404).send({ message: "Not found stock with id " + id })
        //                 })
        //                 .catch(err => {
        //                     res
        //                         .status(500)
        //                         .send({ message: err })
        //                 }).finally(() => {
        //                     res.send(stockDetails)
        //                 })
        //         })
        //         .catch((err) => {
        //             res.status(500).send({
        //                 message: err.message || "Some error occurred while creating the stock."
        //             })
        //         })
        // }
}

exports.findAll = (req, res) => {
    Stock.find({ available: true })
        .populate('_id')
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving stock."
            })
        })
}

exports.findOne = (req, res) => {

    const itemId = req.params.stockId

    Stock.findOne({ _id: itemId })
        .populate('iId')
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving stock."
            })
        })
}


exports.plusStock = (req, res) => {

    const stUpdate = new Uplog({
        data: JSON.stringify(req.params)
    })

    stUpdate.save(stUpdate).catch(() => { console.log('log error') })

    const branchCode = req.params.branchCode
    const itemId = req.params.itemId
    Stock.updateOne({ branchCode: branchCode, itemId: itemId }, { $inc: { "currentStock": req.params.qty } })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update currentStock=${currentStock}`
                })
            } else res.send(true)
            console.log("err")
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating currentStock=" + currentStock
            })
        })

    // StockLog.create()
    // const stockLog = new StockLog({
    //     stockLog: "Added " + req.params.qty + " new items to " + itemId
    // })
    // stockLog
    //     .save(stockLog)
    //     .then((data) => {
    //         res.send(data)
    //         console.log("Added log to stock")
    //     })
    //     .catch((err) => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while creating the stock Log data"
    //         })
    //     })
    // if (req.params.qty > 0) Item.updateOne({ itemId: itemId }, { $inc: { "historicalCount": req.params.qty } })
}


exports.findLast = (req, res) => {
    Stock.findOne().sort({ 'createdAt': -1 }).limit(1).then(data => {
        res.send(data.currentStock);
        console.log(data.currentStock)
    })
}


exports.transferStock = (req, res) => {

    const sentbranchCode = req.params.sentbranchCode
    const itemId = req.params.itemId
    const receivedbranchCode = req.params.receivedbranchCode

    Stock.findOneAndUpdate({ itemId: itemId, branchCode: receivedbranchCode }, { $inc: { currentStock: req.params.qty } })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot adding Stock with itemID. Maybe Stock was not found!`,
                });
            } else res.send(true);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Stock with itemID" + itemId
            })
        })

    Stock.findOneAndUpdate({ itemId: itemId, branchCode: sentbranchCode }, { $inc: { currentStock: req.params.qty * -1 } })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot sending Stock with itemID. Maybe Stock was not found!`
                })
            } else res.send(true)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Stock with itemID " + itemId
            })
        })

}

exports.findByCategory = (req, res) => {

    const category = req.params.category

    Stock.find()
        .populate('iId')
        .then((data) => {
            console.log(data)

            stockReport = []

            data.forEach(stockEntry => {
                if (!stockEntry.itemId || stockEntry.itemId === null) return
                if (stockEntry.itemId.catName == category && stockEntry.itemId._active == true) {
                    // stockReport[stockEntry] = stockEntry
                    stockReport.push(stockEntry)
                }
            })
            res.send(stockReport)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            })
        })
}