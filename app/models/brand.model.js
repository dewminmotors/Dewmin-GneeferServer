module.exports = mongoose => {
    var schema = mongoose.Schema({
            name: String,
            agentNum: String, //
            color: String, //Optional. Can 
            _active: Boolean
        },

    )

    schema.method("toJSON", function() {
        const { _id, ...object } = this.toObject();
        object.brId = _id;
        return object;
    })

    const Brand = mongoose.model("Brand", schema, "Brand");
    return Brand;
}