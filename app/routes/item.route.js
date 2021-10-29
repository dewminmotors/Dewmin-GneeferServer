module.exports = (app) => {
    const items = require("../controllers/item.controller.js")

    var router = require("express").Router()

    router.post(
        "/", [
            checkCatNameExisted
        ],
        items.create)

    router.delete("/:iId", items.DeleteFromItemId)

    router.put("/:iId", items.update)

    router.put("/:iId/:price", items.updatePriceById)

    //router.put("/merge/:id1/:id2", items.UpdateDisputedToRealItem) Dispute

    router.get("/", items.findAllActive)

    router.get("/all", items.findAll)

    router.get("/namebyid/:itemId", items.ItemNameFromId)

    // router.get("/category/:cat", items.findByCategory)

    // router.get("/brand/:br", items.findByBrand)

    // router.get("/name/:name", items.findByName)

    //router.get("/:id", items.findOne) promotion and discounts/increments
    //router.get("/top/:skip", items.findTopItems)


    router.get("/cat/:subCategory", items.findBySubcategory)

    router.get("/category/cName/:cName", items.findByCatAndName)

    app.use("/api/item", router)
};