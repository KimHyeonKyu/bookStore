import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const { Schema } = mongoose;

const MemberSchema = new Schema({
    id: String,
    password: String,
    userName: String,
    phoneNumber: String,
    address: String,
    email: String
});

MemberSchema.methods.setPassword = async function(inputPassword) {
    const hash = await bcrypt.hash(inputPassword, 10);
    this.password = hash;
};

MemberSchema.methods.checkPassword = async function(inputPassword) {
    const result = await bcrypt.compare(inputPassword, this.password);
    return result;
};

MemberSchema.statics.findById = function(id) {
    return this.findOne({ id })
};

MemberSchema.methods.generateToken = function() {
    const token = jwt.sign(
        // 첫 번재 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣는다.
        {
            _id: this.id,
            userName: this.userName
        },
        process.env.JWT_SECRET, // 두 번째 파라미터에는 JWT 암호를 넣는다
        {
            expiresIn: '7d' // 7일 동안 유효함
        }
    );
    return token;
};

const Member = mongoose.model('Member', MemberSchema);
export default Member;