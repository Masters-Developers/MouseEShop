const express=require("express");
const app = express();
const errorMiddleWare = require('./middleWare/errors')
const cookieParser= require("cookie-parser")
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require("path")
//imported constants

if(process.env.NODE_ENV!=="PRODUCTION") require('dotenv').config({path:'backend/config/config.env'})
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//Import routes
const items=require("./routes/item")
const user=require("./routes/auth")
const orders=require("./routes/orders")
app.use('/api',items) //set route
app.use('/api', user)
app.use('/api', orders)
if(process.env.NODE_ENV === "PRODUCTION"){
    app.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
    })
}

//this is for handdle errors
app.use(errorMiddleWare)
module.exports=app