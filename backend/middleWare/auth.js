const User = require ("../models/auth")
const jwt=require("jsonwebtoken")
const ErrorHandler=require ("../utilities/errorHandler")
const catchAsyncErrors= require("../middleWare/catchAsyncErrors")

//Verify the user type
exports.isAuthenticatedUser= catchAsyncErrors(async (req, res, next)=>{
    const {token}= req.cookies

    if(!token){
        return next(new ErrorHandler("You must log in for to get access to this area", 401))
    }

    const encripted = jwt.decode(token, process.env.JWT_SECRET)
    req.user=await User.findById(encripted.id);

    next()

})

//catch role
exports.authorizeRoles= (...roles) =>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Rol (${req.user.role}) you do not have authorization to enter in this area`,403))
        }
        next()
    }
}
