const Order = require("../models/orders");
const Item = require("../models/items");
const catchAsyncErrors = require("../middleWare/catchAsyncErrors");
const ErrorHandler =require("../utilities/errorHandler")
//create new order
exports.newOrder=catchAsyncErrors(async(req,res,next) => {
    const {
        sendInfo,
        items,
        itemsPrice,
        tax,
        sendPrice,
        totalPrice,
        payInfo,
    } = req.body;

    const order= await Order.create({
        sendInfo,
        user: req.user._id,
        items,
        payInfo,
        payDate: Date.now(),
        itemsPrice,
        tax,
        sendPrice,
        totalPrice,
        orderState,
        creationDate:Date.now()
    })

    res.status(200).json({
        success:true,
        order
    })
})
exports.getOrderbyId=catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.body.id).populate("user","name email")
    if(!order){
        return next(new ErrorHandler("Oder's Id not found",404))
    }

    res.status(200).json({
        success:true,
        order
    })
})

//view all my orders
exports.viewMyOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});
    res.status(200).json({
        success:true,
        orders
    })
})
//vew all orders as admin
exports.viewAllOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order=>{
        totalAmount = totalAmount + order.totalPrice
    })
    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})
//update order
exports.updateOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params._id);
    if(!order){
        return next(new ErrorHandler("Order not found",404))
    }
    if (order.orderState==="Send" && req.body.orderState==="Send"){
        return next(new ErrorHandler("This order was send",400))
    }
    if (req.body.state!=="Processing"){
        order.items.forEach(async itemo => {
            await updateStock(itemo.item, itemo.amount)
        })
    }
    order.orderState =req.body.orderState;
    order.creationDate = Date.now();
    await order.save()

    res.status(200).json({
        success:true,
        order
    })
})

async function updateStock(id,quantity){
    const item = await Item.findById(id);
    item.stock = item.stock - quantity;
    await item.save({validateBeforeSave:false})
}
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next (new ErrorHandler("This order does not exist", 404))
    }
    await order.remove()

    res.status(200).json({
        success:true,
        message:"The order was deleted Correctly"
    })
})

