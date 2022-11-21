const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    sendInfo:{
        addres:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"auth"
    },
    items:[{
        name:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        item:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"items"
        }

    }],
    payInfo:{
        id:{
            type:String
        },
        state:{
            type:String
        }
    },
    payDate:{
        type:Date
    },
    itemsPrice:{
        type:Number,
        required: true,
        default: 0.0
    },
    tax:{
        type:Number,
        required:true,
        default:0.0
    },
    sendPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    orderState:{
        type:String,
        required:true,
        default:"Pending"
    },
    creationDate:{
        type:Date,
        default:Date.now
    }
})
module.exports =mongoose.model("orders",orderSchema)