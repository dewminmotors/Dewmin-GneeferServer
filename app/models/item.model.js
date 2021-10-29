module.exports = (mongoose) => {

    autoIncrement = require('mongoose-auto-increment')
    const dbLinks = require("../config/db.config.js")
    var connection = mongoose.createConnection(dbLinks.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    autoIncrement.initialize(connection)

    var schema = mongoose.Schema({

        name: String,
        itemId: Number,
        catName: { type: mongoose.Schema.Types.Mixed, ref: 'Category' },
        brandName: { type: mongoose.Schema.Types.Mixed, ref: 'Brand' },
        sfName: String,
        tag: [String],
        cost: Number,
        disValue: {
            type: Number,
            default: 0
        },
        price: Number,
        _active: Boolean,
        //stocks: [{ type: mongoose.Schema.Types.Mixed, ref: 'Stock' }]
    })

    schema.plugin(autoIncrement.plugin, {
        model: 'Item',
        field: 'itemId',
        startAt: 10000,
        incrementBy: 1
    });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.iId = _id
        return object
    })

    const Item = mongoose.model("Item", schema, "Item")
    return Item
}