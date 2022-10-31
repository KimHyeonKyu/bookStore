import mongoose from "mongoose";
const { Schema } = mongoose;

const membershipSchema = new Schema({
  userName: String,
  point: Number,
});

const membership = mongoose.model("membership", membershipSchema);

export default membership;
