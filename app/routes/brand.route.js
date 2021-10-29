module.exports = (app) => {
    const brand = require("../controllers/brand.controller.js")

    var router = require("express").Router()

    router.post("/", [
            checkBrExisted
        ],
        brand.create)

    router.delete("/:name", brand.DeleteFromName)

    router.put("/:name", brand.updateBrandByName)

    router.get("/all", brand.findAll)

    router.get("/", brand.findAllActive)

    router.get("/:name", brand.findByName)

    app.use("/api/brand", router)
}