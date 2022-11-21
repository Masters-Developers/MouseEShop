const express = require("express");
const { newOrder, getOrderbyId, viewMyOrders, viewAllOrders, updateOrder, deleteOrder } = require("../controllers/ordersController");
const router =express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
router.route("/orders/new").post(isAuthenticatedUser, newOrder)
router.route("/orders/:id").get(isAuthenticatedUser, getOrderbyId)
router.route("/orders/myorders").get(isAuthenticatedUser, viewMyOrders)
//management routers
router.route("/management/orders").get(isAuthenticatedUser, authorizeRoles("management"), viewAllOrders)
router.route("/management/orders/:id").put(isAuthenticatedUser, authorizeRoles("management"), updateOrder)
router.route("/management/orders/:id").delete(isAuthenticatedUser, authorizeRoles("management"), deleteOrder)
module.exports=router;