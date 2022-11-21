
const itemss=require("../models/items");
const ErrorHandler = require("../utilities/errorHandler");
const APIFeatures = require("../utilities/apiFeatures");
const catchAsyncErrors = require ("../middleWare/catchAsyncErrors")
const fetch =(url)=>import('node-fetch').then(({default:fetch})=>fetch(url)); //Import Fetch
const cloudinary=require("cloudinary")
//VIEW ITEMS'S LIST
exports.getItems= catchAsyncErrors( async(req,res,next) =>{
    const resPerPage = 8;
    const itemsCount = await itemss.countDocuments();

    const apiFeatures = new APIFeatures(itemss.find(), req.query)
        .search()
        .filter();

    let items = await apiFeatures.query;
    let filteredItemsCount= items.length;
    apiFeatures.pagination(resPerPage);
    items = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        itemsCount,
        resPerPage,
        filteredItemsCount,
        items
    })
   
})
//VIEW itemS BY ID
exports.getItemsByID= catchAsyncErrors( async(req,res,next) =>{
    const item = await itemss.findById(req.params.id);

    if(!item){
        return next(new ErrorHandler ("Item not found", 404))
    }
    res.status(200).json({
        success:true,
        message:"below you can find the details about this item: ",
        item
    })
})
//Create new item /api/items
exports.newItem= catchAsyncErrors( async(req,res,next)=>{
    let image=[]
    if(typeof req.body.image==="string"){
        image.push(req.body.image)
    }else{
        image=req.body.image
    }

    let imageLink=[]

    for (let i=0; i<image.length;i++){
        const result = await cloudinary.v2.uploader.upload(image[i],{
            folder:"items"
        })
        imageLink.push({
            public_id:result.public_id,
            url: result.secure_url
        })
    }

    req.body.image=imageLink
    req.body.user = req.user.id;
    const item = await itemss.create(req.body);
    res.status(201).json({
        success: true,
        item
    })
})
//Update item
exports.updateItem=catchAsyncErrors( async(req,res,next)=>{
    let item = await itemss.findById(req.params.id);

    if (!item) {
        return next(new ErrorHandler("Item not found", 404))
    }
    let image=[]

    if (typeof req.body.image=="string"){
        image.push(req.body.image)
    }else{
        image=req.body.image
    }
    if (image!== undefined){
        //eliminar imagees asociadas con el item
        for (let i=0; i<item.image.lenght; i++){
            const result= await cloudinary.v2.uploader.destroy(item.image[i].public_id)
        }

        let imageLinks=[]
        for (let i=0; i<image.lenght; i++){
            const result = await cloudinary.v2.uploader.upload(image[i],{
                folder:"items"
            });
            imageLinks.push({
                public_id:result.public_id,
                url: result.secure_url
            })
        }
        req.body.image=imageLinks
    }

    //Si el objeto si existia, entonces si ejecuto la actualización
    item = await itemss.findByIdAndUpdate(req.params.id, req.body, {
        new: true, //Valido solo los atributos nuevos o actualizados
        runValidators: true
    });
    //Respondo Ok si el item si se actualizó
    res.status(200).json({
        success: true,
        message: "Item Updated Successful",
        item
    })
})
//DELETE A ITEM
exports.deleteItem=catchAsyncErrors( async (req,res,next) =>{
    const item= await itemss.findById(req.params.id) //
    if(!item){
        return next(new ErrorHandler ("Item not found", 404))
    }

    await item.remove();//delete the process
    res.status(200).json({
        success:true,
        message:"Succesfully deleted Item"
    })
})
exports.createItemReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, itemId } = req.body;

    const opinion = {
        clientName: req.user.name,
        rating: Number(rating),
        comment
    }

    const item= await itemss.findById(itemId);

    const isReviewed = item.opinions.find(item =>
        item.clientName === req.user.name)

    if (isReviewed) {
        item.opinions.forEach(opinion => {
            if (opinion.clientName === req.user.name) {
                opinion.comment = comment,
                    opinion.rating = rating
            }
        })
    } else {
        item.opinions.push(opinion)
        item.qualificationsNumber = item.opinions.length
    }

    item.qualification = item.opinions.reduce((acc, opinion) =>
        opinion.rating + acc, 0) / item.opinions.length

    await item.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Your opinion was saved"
    })

})

//Ver todas las review de un itemo
exports.getItemReviews = catchAsyncErrors(async (req, res, next) => {
    const item = await itemss.findById(req.query.id)

    res.status(200).json({
        success: true,
        opiniones: item.opinions
    })
})

//Eliminar review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const item = await itemss.findById(req.query.itemId);

    const opinionss = item.opinions.filter(opinion =>
        opinion._id.toString() !== req.query.idReview.toString());

    const qualificationsNumber = opinionss.length;

    const qualification = item.opinions.reduce((acc, Opinion) =>
        Opinion.rating + acc, 0) / opinionss.length;

    await itemss.findByIdAndUpdate(req.query.itemId, {
        opinionss,
        qualification,
        qualificationsNumber
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Deleted Review correctly"
    })

})
exports.getItemsManagement= catchAsyncErrors( async(req,res,next) =>{
    
    const items = await itemss.find();

    
    res.status(200).json({
        success: true,
        items
    })
   
})
//view all items
function viewItems(){
    fetch('http://localhost:4000/api/items')
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}

//viewItems(); CALL THE METHOD TO WATCH THE ITEMS

//view by id
function viewItemsById(id){
    fetch('http://localhost:4000/api/items/'+id)
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}

//vireItemsById('id'); test the method with an id
