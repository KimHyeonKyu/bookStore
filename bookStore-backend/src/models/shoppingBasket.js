import mongoose from "mongoose";

const { Schema } = mongoose;

const ShoppingBasketSchema = new Schema({
    id: String,
    bookName: String,
    bookPrice: Number,
    quantity: Number,
    checkState: String,
    bookImage: String
});

const ShoppingBasket = mongoose.model('ShoppingBasket', ShoppingBasketSchema);
export default ShoppingBasket;