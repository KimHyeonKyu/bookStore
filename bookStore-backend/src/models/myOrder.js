import mongoose from "mongoose";
const { Schema } = mongoose;

const myOrderSchema = new Schema({
  buyerDay: String,
  orderNumber: String,
  buyerName: String,
  bookName: String,
  bookPrice: String,
});

const myOrder = mongoose.model("myOrder", myOrderSchema);

export default myOrder;
