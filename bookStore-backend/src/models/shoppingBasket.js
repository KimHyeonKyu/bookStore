import mongoose from "mongoose";

const { Schema } = mongoose;

const ShoppingBasketSchema = new Schema({
    id: String,
    bookName: String,
    bookPrice: Number
});

const ShoppingBasket = mongoose.model('ShoppingBasket', ShoppingBasketSchema);
export default ShoppingBasket;