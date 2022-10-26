import mongoose from "mongoose";

const { Schema } = mongoose;

const ShoppingBasketSchema = new Schema({
    bookName: String,
    bookPrice: String
});

const ShoppingBasket = mongoose.model('ShoppingBasket', ShoppingBasketSchema);
export default ShoppingBasket;