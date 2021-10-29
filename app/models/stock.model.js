module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        branchCode: String,
        itemId: {
            type: mongoose.Schema.Types.Mixed,
            ref: "Item"
        },
        cost: {
            type: mongoose.Schema.Types.Mixed,
            ref: "Item"
        },
        price: {
            type: mongoose.Schema.Types.Mixed,
            ref: "item"
        },
        disValue: {
            type: mongoose.Schema.Types.Mixed,
            ref: "item"
        },
        name: {
            type: mongoose.Schema.Types.Mixed,
            ref: "Item"
        },
        brandName: {
            type: mongoose.Schema.Types.Mixed,
            ref: "Item"
        },
        currentStock: { type: Number, default: 0 },
        stockVal: Number,
        available: Boolean
    }, { timestamps: true });

    schema.method("toJSON", function() {
        const { _id, ...object } = this.toObject();
        object._id = _id;
        return object;
    });

    const Stock = mongoose.model("Stock", schema, "Stock");
    return Stock;
};