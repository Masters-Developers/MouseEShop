const app=require("./app")
const connectDatabase = require("./config/database");
const cloudinary= require("cloudinary")

//Set the config file
if(process.env.NODE_ENV==="PRODUCTION") require('dotenv').config({path:'backend/config/config.env'})


//SETTINGS DATABASE
connectDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
//CALLING SERVER
const server=app.listen(process.env.PORT, () => {
    console.log(`Server started in port: ${process.env.PORT} in mode: ${process.env.NODE_ENV}`)
})
