const ErrorHandler = require('../utilities/errorHandler')

module.exports =(err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

    res.status(err.statusCode).json({
        succes:false,
        message:err.stack
    })
    //Error password duplicate in mongoose
    if(err.code===11000){
        const message =`Password duplicate ${Object.keys(err.keyValue)}`
        error = new ErrorHandler(message,400)
    }
    //Error in JWT
    if(err.name ==="JsonWebTokenError"){
        const message = "Json web token Token invalid, try again"
        error = new ErrorHandler(message,400)
    }
    //JWT TOKEN EXPIRED
    if(err.name === "TokenExpiredError"){
        const message = " JWT Token Expired"
        error= new ErrorHandler(message, 400)
    }
}