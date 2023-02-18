const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    category:String,
    company:String,
    price:String,
    userId:String,
    userEmail:String
})

const Product = mongoose.model('products',productSchema);

module.exports = Product;