module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        invId: Number,
        username: String,
        payMethod: ["CASH", "VISA", "MASTER_CARD", "AMEX", "ONLINE"],
        totDiscount: Number,
        totValue: Number,
        dateTime: Date,
        //customer: { type: mongoose.Schema.Types.Mixed, ref: 'customer' },
        branchCode: String,
        totalItems: Number,
        _active: Boolean,
        purchases: [{ type: mongoose.Schema.Types.Mixed, ref: 'purchase' }]
    });

    schema.plugin(autoIncrement.plugin, {
        model: 'invoice',
        field: 'invId',
        startAt: 10000,
        incrementBy: 1
    });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;

        return object;
    });

    const Invoice = mongoose.model("invoice", schema);
    return Invoice;
};