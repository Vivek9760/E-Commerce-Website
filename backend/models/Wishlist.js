const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    name:String,
    category:String,
    company:String,
    price:String,
    userId:String,
    userEmail:String,
    productId:String
})

const Wishlist = mongoose.model('wishlists',wishlistSchema);

module.exports = Wishlist