const express=require("express");
const { userRegistration,logInUser,logOut, forgotPassword, resetPassword, getUserProfile,updatePassword,updateProfile,getAllUsers,updateUser,getUserDetails, deleteUser} = require("../controllers/authController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const router= express.Router();

router.route('/user/registration').post(userRegistration)
router.route('/login').post(logInUser)
router.route('/logout').get(isAuthenticatedUser, logOut)
router.route("/forgotPassword").post(forgotPassword)
router.route('/resetpassword/:token').post(resetPassword)
router.route('/myprofile').get(isAuthenticatedUser,getUserProfile)
router.route('/myprofile/updatePassword').put(isAuthenticatedUser, updatePassword)
router.route('/myprofile/updateProfile').put(isAuthenticatedUser, updateProfile)

//rutas management
router.route('/management/allUsers').get(isAuthenticatedUser, authorizeRoles("management"), getAllUsers)
router.route('/management/user/:id').get(isAuthenticatedUser, authorizeRoles("management"), getUserDetails)
router.route('/management/updateUser/:id').put(isAuthenticatedUser, authorizeRoles("management"), updateUser)
router.route('/management/deleteuser/:id').delete(isAuthenticatedUser,authorizeRoles("management"),deleteUser)
module.exports= router