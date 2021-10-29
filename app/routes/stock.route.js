module.exports = app => {
    const stock = require("../controllers/stock.controller.js")

    var router = require("express").Router()

    router.post("/", stock.create)

    router.put("/update/:branchCode/:itemId/:qty", stock.plusStock)

    router.get("/", stock.findAll)

    router.get("/stockId/:stockId", stock.findOne)

    router.get("/branchCode/:bc", stock.findByBranchCode)

    router.get("/category/:category", stock.findByCategory)

    router.get("/brand/branch/:brand/:branch", stock.findByBrandBranch)

    router.put("/stocktransfer/:sentbranchCode/:receivedbranchCode/:itemId/:qty", stock.transferStock)

    router.get("/itemId/:itemId", stock.findByItemId);

    app.use("/api/stock", router)
}