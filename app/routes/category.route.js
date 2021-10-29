module.exports = (app) => {
    const category = require("../controllers/category.controller.js")

    var router = require("express").Router()

    router.post("/", [
            checkCatExisted
        ],
        category.create)

    router.delete("/:catName", category.DeleteFromCatName)

    router.put("/:catName", category.updateCatByCatName)

    router.get("/all", category.findAll)

    router.get("/", category.findAllActive)

    //router.get("/item/:name", category.findByName);

    router.get("/:catName", category.findByCatName)

    router.get("/cat/:subCategory", category.findBySubcategory)

    app.use("/api/category", router)
}