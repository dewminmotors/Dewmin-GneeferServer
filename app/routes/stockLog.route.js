module.exports = app => {
    const stockLog = require("../controllers/stockLog.controller.js")

    var router = require("express").Router()

    router.post("/", stockLog.create)

    app.use("/api/stockLog", router)
}