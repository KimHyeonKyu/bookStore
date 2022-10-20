import mongoose from "mongoose";

const { Schema } = mongoose;

const MemberSchema = new Schema({
    id: String,
    password: String,
    userName: String,
    phoneNumber: String,
    address: String,
    email: String,
    publishedData: {
        type: Date,
        default: Date
    }
});