const User = require("../models/auth")
const ErrorHandler= require("../utilities/errorHandler")
const catchAsyncErrors= require("../middleWare/catchAsyncErrors")
const sendToken = require("../utilities/jwtToken")
const sendEmail = require("../utilities/sendEmail")
const crypto = require("crypto")
const cloudinary= require("cloudinary")
//Users Registration

exports.userRegistration= catchAsyncErrors(async (req, res, next) =>{
    const {name, email, password} = req.body;
    const result= await cloudinary.v2.uploader.upload(req.body.photo, {
        folder:"pictures",
        width:240,
        crop:"scale"
    })
    const user = await User.create({
        name,
        email,
        password,
        photo:{
            public_id:result.public_id,
            url:result.secure_url
        }
    })
    sendToken(user,201,res)
})
//Log In
exports.logInUser = catchAsyncErrors(async(req,res,next) =>{
    const {email,password} = req.body;
    if (!email || !password){
        return next(new ErrorHandler("Please enter your email and password",400))
    }
    const user = await User.findOne({email}).select("+password")
    if (!user){
        return next(new ErrorHandler("Email or Passwrod invalid",401))
    }
    const correctPassword = await user.comparePassword(password)
    if (!correctPassword){
        return next(new ErrorHandler("Invalid Password",401))
    }

    sendToken(user,200,res)
})
//logout
exports.logOut = catchAsyncErrors(async(req, res, next)=>{
    res.cookie("token",null, {
         expires: new Date(Date.now()),
         httpOnly: true
    })

    res.status(200).json({
        success:true,
        message: "Log out"
    })
})

//FORGOTEN AND RECOVERY PASSWORD
exports.forgotPassword = catchAsyncErrors ( async( req, res, next) =>{
    const user= await User.findOne({email: req.body.email});

    if (!user){
        return next(new ErrorHandler("The user was not found in data base", 404))
    }
    const resetToken= user.genResetPasswordToken();
    
    await user.save({validateBeforeSave: false})

    //Crear una url para hacer el reset de la contraseña
    const resetUrl= `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;

    const message=`Hi!\n\n link for Choose a new password: \n\n${resetUrl}\n\n
    If your do not ask for this link, Please report this with support.\n\n Att:\n MOUSE E SHOP`

    try{
        await sendEmail({
            email:user.email,
            subject: "MOUSE E SHOP Password recovery",
            message
        })
        res.status(200).json({
            success:true,
            message: `Email send to : ${user.email}`
        })
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500))
    }
})
//Reset Password
exports.resetPassword = catchAsyncErrors(async (req,res,next) =>{
    //Hash el token que llego con la URl
    const resetPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex")
    //BSEarch the user to set new password
    const user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })
    //the user is in data base?
    if(!user){
        return next(new ErrorHandler("Invalid or expired Token",400))
    }
    //validation passwords
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Invalid password",400))
    }

    //setter new password
    user.password= req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();
    sendToken(user, 200, res)
})
//View User Profile( user logged)
exports.getUserProfile = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success : true,
        user
    })
})
exports.updatePassword = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findById(req.user.id).select("+password");
    //validations if old password = new password
    const samePasswords = await user.comparePassword(req.body.oldPassword)
    if(!samePasswords){
        return next (new ErrorHandler("The old password and the current password are not the same",401))
    }
    user.password = req.body.newPassword;
    await user.save()
    sendToken(user,200,res)
})
//update profile
exports.updateProfile = catchAsyncErrors(async(req,res,next) =>{
    const newUserData = {
        name: req.user.name,
        email:req.user.email
    }
  //updata photo: 
  if (req.body.photo !==""){
    const user= await User.findById(req.user.id)
    const image_id= user.photo.public_id;
    const res= await cloudinary.v2.uploader.destroy(image_id);

    const result= await cloudinary.v2.uploader.upload(req.body.photo, {
        folder: "photos",
        width: 240,
        crop: "scale"
    })

    newUserData.photo={
        public_id: result.public_id,
        url: result.secure_url
    }
}
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify: false
    })
    res.status(200).json({
        success:true,
        user
    })
})


//view al users
exports.getAllUsers = catchAsyncErrors(async(req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

//View User Deatails
exports.getUserDetails= catchAsyncErrors(async(req, res, next)=>{
    const user= await User.findById(req.params.id);

    if (!user){
        return next(new ErrorHandler(`User not found: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//Update user Profile AS MANAGEMENT
exports.updateUser= catchAsyncErrors (async(req, res, next)=>{
    const newData={
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user= await User.findByIdAndUpdate(req.params.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        user
    })
})
//Delete User
exports.deleteUser = catchAsyncErrors(async(req,res,next) =>{
    const user = await User.findById(req.params.id);
    if (!user){
        return next(new ErrorHandler(`User with Id :${req.params.id} not fount in the data base`))
    }
    await user.remove();
    res.status(200).json({
        success:true,
        message:"User was deleted correctly"
    })
})