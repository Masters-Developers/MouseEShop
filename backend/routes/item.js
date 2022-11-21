const express=require("express")
const router=express.Router();

const {getItems, newItem, getItemsByID,updateItem,deleteItem,createItemReview,getItemReviews,deleteReview, getItemsManagement} = require("../controllers/itemsController.js") //Bring the response from Items Controller
const { isAuthenticatedUser , authorizeRoles} = require("../middleWare/auth");
router.route('/items').get(getItems); //Set router for to get THE ITEMS
router.route('/items/new').post(isAuthenticatedUser, authorizeRoles("management"),newItem); //SET THE ROUTER FOR CREATE A NEW ITEM
router.route('/items/:id').get(getItemsByID);//set route for get items by id
router.route('/items/:id').put(isAuthenticatedUser, authorizeRoles("management"),updateItem);//set router for update a item
router.route('/items/:id').delete(isAuthenticatedUser, authorizeRoles("management"),deleteItem); //set router for delte a item
router.route('/management/items').get(isAuthenticatedUser,authorizeRoles("management"),getItemsManagement)
router.route("/review").put(isAuthenticatedUser, createItemReview)
router.route("/reviews").get(isAuthenticatedUser, getItemReviews)
router.route("/review").delete(isAuthenticatedUser, deleteReview)
module.exports=router;