module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        stockLog: String
    }, { timestamps: true })
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })
    const StockLog = mongoose.model("StockLog", schema, "StockLog")
    return StockLog
}