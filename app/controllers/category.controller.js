const { category } = require("../models")
const db = require("../models")
const Category = db.category
const Item = db.item


exports.create = (req, res) => {

    if (!req.body.catName) {
        res.status(400).send({ message: "catName can not be empty!" })
        return
    }
    const categories = new Category({

        catName: req.body.catName.toUpperCase(),
        _active: true,
        subCategory: req.body.subCategory,
        auditedDate: req.body.auditedDate
    })

    categories
        .save(categories)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the category.",
            })
        })
}


exports.findByCatName = (req, res) => {
    let catdar = {}
    let catDet = []
    const catName = req.params.catName
    var condition = catName ? {
        catName: { $regex: new RegExp(req.params.catName), $options: "i" },
        _active: true
    } : {}

    Category.find(condition).sort({ 'catName': 1 })
        .then((data) => {
            data.forEach(category => {
                catdar = {
                    catName: category.catName,
                    subCategory: category.subCategory,
                    auditedDate: category.auditedDate,
                    _active: category._active
                }

                catDet.push(catdar)
            })
            res.send(catDet)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories.",
            })
        })
}

exports.findAll = (req, res) => {
    let catdar = {}
    let catDet = []
    Category.find().sort({ 'catName': 1 })
        .then(data => {
            data.forEach(category => {
                catdar = {
                    catName: category.catName,
                    subCategory: category.subCategory,
                    auditedDate: category.auditedDate,
                    _active: category._active
                }
                catDet.push(catdar)
            })
            res.send(catDet)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving category."
            })
        })
}

exports.findAllActive = (req, res) => {
    let catdar = {}
    let catDet = []
    Category.find({ _active: true }).sort({ 'catName': 1 })
        .then(data => {
            data.forEach(category => {
                catdar = {
                    catName: category.catName,
                    subCategory: category.subCategory,
                    auditedDate: category.auditedDate,
                    _active: category._active
                }
                catDet.push(catdar)
            })
            res.send(catDet)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Category."
            })
        })
}


exports.updateCatByCatName = (req, res) => {
    const catName = req.params.catName;

    Category.findOneAndUpdate({ catName: catName }, { $set: req.body })
        .then(data => {

            if (data) {
                res.send(true)

            } else res.status(404).send({
                message: `Cannot update Brand with catName=${catName}. Maybe category was not found!`,
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Brand with catName=" + catName,

            })
        })
}


exports.DeleteFromCatName = (req, res) => {
    const catName = req.params.catName

    Category.findOneAndUpdate({ catName: catName }, { $set: { _active: false } })
        .then(data => {

            if (data) {
                res.send(true)

            } else res.status(404).send({
                message: `Cannot delete category with catName=${catName}. Maybe category was not found!`,
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err,
            })
        })
}


exports.findBySubcategory = (req, res) => {
    let subcatar = {}
    let subcatDet = []

    Category.find({
            subCategory: req.params.subCategory,
            _active: true
        })
        .then((data) => {
            data.forEach(brand => {
                subcatar = {
                    brandName: brand.brandName,
                    subCategory: brand.subCategory,
                    auditedDate: brand.auditedDate,
                    _active: brand._active
                }
                subcatDet.push(subcatar)
            })
            res.send(subcatDet)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving subCategory.",
            })
        })
}



checkCatExisted = (req, res, next) => {

    Category.findOne({
        catName: req.body.catName.toUpperCase(),
    }).exec((err, item) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }

        if (item) {
            res.status(400).send({ message: "Duplicate Entry !. category already exists" })
            return
        }


        next()

    })
}