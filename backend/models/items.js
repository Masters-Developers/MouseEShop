const mongoose=require("mongoose")

const itemsSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Type the item's name."],
        trim:true,
        maxLength:[120,"the item's name must not be longer than 120 characters."]
    },
    price:{
        type: Number,
        required:[true,"Please register the item's price."],
        maxLength:[8, "The item's price can not be above to 99'999.999"],
        default: 0.0
    },
    description:{
      type:String,
      required:[true,"Please register the item's desciption."]
    },
    qualification:{
        type: Number,
        default: 0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Select the item's category."],
        enum:{
            values:[
                "Technology",
                "Food",
                "Home",
                "Clothes",
                "Medicines",
                "Animals",
                "Toys",
                "Video Games"
            ]
        }
    },
    seller:{
        type:String,
        required:[true,"Please register the seller's name"]
    },
    stock:{
        type: Number,
        required:[true, "Please register the item's stock"],
        maxLength:[5,"The stock can not above to 99999"],
        default:0
    },
    qualificationsNumber:{
        type:Number,
        default:0
    },
    opinions:[
        {
            clientName:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    creationDate:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("items",itemsSchema)