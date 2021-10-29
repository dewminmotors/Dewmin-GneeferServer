const db = require("../models")
const axios = require('axios')
const itemController = require("./item.controller.js")
const PurchaseController = require("./purchase.controller.js")
const Purchase = db.purchase
const Invoice = db.invoice
const Item = db.item
    //const Category = db.category
const Stock = db.stock

exports.salesByBranch = (req, res) => {

    var endDate = new Date(req.params.endDate)
    endDate.setDate(endDate.getDate() + 1)
    console.log(endDate)

    branchSalesCount = {}
    branchSalesCount['KUL'] = 0
    Purchase.find({
            "dateTime": { "$gte": new Date(req.params.startDate), "$lt": endDate },
            _active: true
        })
        .then((data) => {
            data.forEach(sale => {

                console.log("A sale of " + sale.qty + "has happened in " + sale.branchCode)


                branchSalesCount[sale.branchCode] = branchSalesCount[sale.branchCode] ? branchSalesCount[sale.branchCode] + sale.qty : sale.qty

            })
            res.send(branchSalesCount)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error with report"
            })
        })
}

exports.salesByBrand = (req, res) => {
    categorySalesCount = {}

    var endDate = new Date(req.params.endDate)
    endDate.setDate(endDate.getDate() + 1)
    console.log(endDate)

    Purchase.find({
            "dateTime": { "$gte": new Date(req.params.startDate), "$lt": endDate },
            _active: true
        })
        .then((data) => {
            data.forEach(sale => {
                console.log("A sale of " + sale.qty + "has happened in " + sale.brandName)
                categorySalesCount[sale.brandName] = categorySalesCount[sale.brandName] ? categorySalesCount[sale.brandName] + sale.qty : sale.qty
            })
            res.send(categorySalesCount)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error with report"
            })
        })
}

exports.revenueByBranch = (req, res) => {
    branchRevenueCount = {}

    var dateTimeAfter = new Date(req.params.dateTimeAfter)
    dateTimeAfter.setDate(dateTimeAfter.getDate() + 1)
    console.log(dateTimeAfter)


    Purchase.find({
            "dateTime": { "$gte": new Date(req.params.dateTimeBefore), "$lt": dateTimeAfter },
            _active: true
        })
        .then((data) => {
            data.forEach(revenue => {

                console.log("A revenue of " + revenue.discPrice * revenue.qty + "has happened in " + revenue.branchCode)
                branchRevenueCount[revenue.branchCode] = branchRevenueCount[revenue.branchCode] ? branchRevenueCount[revenue.branchCode] + revenue.discPrice * revenue.qty : revenue.discPrice * revenue.qty

            })
            res.send(branchRevenueCount)

        })
        .catch((err) => {
            res.status(500).send({
                message: "Some error with report"
            })
        })
}


exports.revenueByBrand = (req, res) => {
    categoryRevenueCount = {}

    var endDate = new Date(req.params.endDate)
    endDate.setDate(endDate.getDate() + 1)
    console.log(endDate)
    Purchase.find({
            "dateTime": { "$gte": new Date(req.params.startDate), "$lt": endDate },
            _active: true
        })
        .then((data) => {
            data.forEach(revenue => {
                console.log(revenue)
                console.log("A revenue of " + revenue.discPrice * revenue.qty + "has happened in " + revenue.brandName)
                categoryRevenueCount[revenue.brandName] = categoryRevenueCount[revenue.brandName] ? categoryRevenueCount[revenue.brandName] + revenue.discPrice * revenue.qty : revenue.discPrice * revenue.qty

            })
            res.send(categoryRevenueCount)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error with report"
            })
        })
}

exports.getDetailsOfPurchases = (req, res) => {

    var endDate = new Date(req.params.endDate)
    endDate.setDate(endDate.getDate() + 1)
    console.log(endDate)

    Purchase.find({
            dateTime: {
                $gte: req.params.startDate,
                $lt: endDate
            },
            _active: true
        })
        .then((data) => {
            res.send(data)
            console.log(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Purchase.",
            })
        })
}

exports.getDetailsOfPurchasesByBrand = (req, res) => {

    var endDate = new Date(req.params.endDate)
    endDate.setDate(endDate.getDate() + 1)
    console.log(endDate)

    Purchase.find({
            brandName: req.params.brandName,
            dateTime: {
                $gte: req.params.startDate,
                $lt: endDate,
            },

            _active: true
        })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Purchase.",
            })
        })


}

exports.getDetailsOfPurchasesByBranch = (req, res) => {

    var endDate = new Date(req.params.endDate)
    endDate.setDate(endDate.getDate() + 1)
    console.log(endDate)

    Invoice.find({
            branchCode: req.params.branchCode,
            createdAt: {
                $gte: req.params.startDate,
                $lt: endDate,
            },

            _active: true
        })
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Purchase.",
            })
        })
}

exports.getDetailsOfPurchasesByBrandInBranch = (req, res) => {

    var endDate = new Date(req.params.endDate)
    endDate.setDate(endDate.getDate() + 1)
    console.log(endDate)

    Purchase.find({
            branchCode: req.params.branchCode,
            brandName: req.params.brandName,
            dateTime: {
                $gte: req.params.startDate,
                $lt: endDate,
            },
            _active: true

        })
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Purchase.",
            })
        })
}

exports.categoryByBranch = (req, res) => {

    findCategorywiseCount = () => {

        return Stock.find({
            branchCode: req.params.branchCode,
        }).populate('item').then((stockData) => {

            categorywiseCount = []

            stockData.forEach(stockEntry => {
                if (!stockEntry.item) return



                categorywiseCount[stockEntry.item.categoryName] = categorywiseCount[stockEntry.item.categoryName] ? categorywiseCount[stockEntry.item.categoryName] + stockEntry.currentStock : stockEntry.currentStock
            })



            return categorywiseCount
        })

    }

    findCategorywiseCount().then((data) => {
        res.send(Object.assign({}, data))
    }).catch((err) => {
        console.log(err)
    })

}


exports.salesByItem = (req, res) => {
    ItemSalesCount = {}


    Purchase.find({
            _active: true,
            item: req.params.item
        })
        .then((data) => {
            console.log(data)
            if (!data[0]) {

                console.log("A sale of " + 0 + "has happened in " + req.params.item)

                ItemSalesCount[req.params.item] = 0
                res.send(ItemSalesCount)

            } else {
                data.forEach(sale => {

                    console.log("A sale of " + sale.qty + "has happened in " + sale.item)
                    Item[sale.item] = Item[sale.item] ? ItemSalesCount[sale.item] + sale.qty : sale.qty
                })
            }
            res.send(ItemSalesCount)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error with report"
            })
        })
}