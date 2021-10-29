module.exports = app => {
    const reports = require("../controllers/report.controller.js")

    var router = require("express").Router()

    router.get("/sales/branch/timerange/:startDate/:endDate", reports.salesByBranch)

    router.get("/sales/brand/timerange/:startDate/:endDate", reports.salesByBrand)

    router.get("/revenue/branch/timerange/:dateTimeBefore/:dateTimeAfter", reports.revenueByBranch)

    router.get("/revenue/brand/timerange/:startDate/:endDate", reports.revenueByBrand)

    router.get("/details/timerange/:startDate/:endDate", reports.getDetailsOfPurchases)

    router.get("/details/category/timerange/:brandName/:startDate/:endDate", reports.getDetailsOfPurchasesByBrand)

    router.get("/details/branch/timerange/:branchCode/:startDate/:endDate", reports.getDetailsOfPurchasesByBranch)

    router.get("/details/branch/brand/timerange/:branchCode/:brandName/:startDate/:endDate", reports.getDetailsOfPurchasesByBrandInBranch)

    router.get("/stock/branch/:branchCode/", reports.categoryByBranch)

    router.get("/salesCount/item/:itemId", reports.salesByItem)

    app.use('/api/report', router)
}