module.exports = mongoose => {
    var schema = mongoose.Schema({
            catName: String,
            subCategory: String, //Can keep as an enum
            auditedDate: {
                type: Date,
                default: '2000-01-01'
            },
            _active: Boolean
        },

    );

    schema.method("toJSON", function() {
        const { _id, ...object } = this.toObject();
        object.CId = _id;
        return object;
    });

    const Category = mongoose.model("Category", schema, "Category");
    return Category;
};