import mongoose from "mongoose";

const { Schema } = mongoose;

const BoardSchema = new Schema({
  username: String,
  id: String,
  subject: String,
  content: String,
  datetime: String,
});

const Board = mongoose.model("Board", BoardSchema);
export default Board;
