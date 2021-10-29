const { brand } = require("../models")
const db = require("../models")
const Brand = db.brand
const Item = db.item


exports.create = (req, res) => {

    if (!req.body.name) {
        res.status(400).send({ message: "name can not be empty!" })
        return
    }
    const brand = new Brand({

        name: req.body.name.toUpperCase(),
        agent: req.body.agent,
        color: req.body.color,
        _active: true,
    })

    brand
        .save(brand)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the brand.",
            })
        })
}


exports.findByName = (req, res) => {
    let brdar = {}
    let brDet = []
    const name = req.params.name
    var condition = name ?
        {
            name: { $regex: new RegExp(req.params.name), $options: "i" },
            _active: true
        } :
        {}

    Brand.find(condition).sort({ 'name': 1 })
        .then((data) => {
            data.forEach(brand => {
                brdar = {
                    name: brand.name,
                    agent: brand.agent,
                    color: brand.color,
                    _active: brand._active
                }

                brDet.push(brdar)
            })
            res.send(brDet)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving brands.",
            })
        })
}

exports.findAll = (req, res) => {
    let brdar = {}
    let brDet = []
    Brand.find().sort({ 'name': 1 })
        .then(data => {
            data.forEach(brand => {
                brdar = {
                    name: brand.name,
                    agent: brand.agent,
                    color: brand.color,
                    _active: brand._active
                }
                brDet.push(brdar)
            })
            res.send(brDet)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving brand."
            })
        })
}

exports.findAllActive = (req, res) => {
    let brdar = {}
    let brDet = []
    Brand.find({ _active: true }).sort({ 'name': 1 })
        .then(data => {
            data.forEach(brand => {
                brdar = {
                    name: brand.name,
                    agent: brand.agent,
                    color: brand.color,
                    _active: brand._active
                }
                brDet.push(brdar)
            })
            res.send(brDet)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Brand."
            })
        })
}


exports.updateBrandByName = (req, res) => {
    const name = req.params.name;

    Brand.findOneAndUpdate({ name: name }, { $set: req.body })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot update Brand with name=${name}. Maybe brand was not found!`,
                })
            } else res.send(true)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Brand with name =" + name,

            })
        })
}


exports.DeleteFromName = (req, res) => {
    const name = req.params.name

    Brand.findOneAndUpdate({ name: name }, { $set: { _active: false } })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot delete brand with name=${name}. Maybe brand was not found!`,
                })
            } else res.send(true)
        })
        .catch((err) => {
            res.status(500).send({
                message: err,
            })
        })
}


checkBrExisted = (req, res, next) => {

    Brand.findOne({
        name: req.body.name.toUpperCase(),
    }).exec((err, item) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }

        if (item) {
            res.status(400).send({ message: "Duplicate Entry !. brand already exists" })
            return
        }
        next()

    })
}