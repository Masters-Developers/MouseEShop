const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt= require("jsonwebtoken")
const crypto= require("crypto")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Write your name"],
        maxlength: [120, "The name can not exceed 120 characters"]
    },
    email: {
        type: String,
        required: [true, "Please wirte your Email"],
        unique: true,
        validate: [validator.isEmail, "Please write a valid email"]
    },
    password: {
        type: String,
        required: [true, "please select a password"],
        minlength: [8, "Your password must have more than 8 characters"],
        select: false
    },
    photo: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    registryDate: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date

})
//Encrypting password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})
//Decode Password And Compare it 
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
//Send a token by JsonWebToken
userSchema.methods.getJwtToken = function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}
//Token for reset or change password
userSchema.methods.genResetPasswordToken = function () {
    const resetToken= crypto.randomBytes(20).toString('hex')

    //Hashear y setear resetToken
    this.resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest('hex')

    //Setear fecha de expiracion del token
    this.resetPasswordExpire= Date.now() + 30*60*1000 //el token dura solo 30 min

    return resetToken
}


module.exports = mongoose.model("auth", userSchema)