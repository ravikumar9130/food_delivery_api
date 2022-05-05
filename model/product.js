const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    }
})

const product = mongoose.model('product', productSchema);


module.exports = product ;