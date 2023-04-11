
const express=require("express")
const router=express.Router()
const {getUser,getUserById,updateUser,userPurchaseList}=require("../controllers/user")
const {isAdmin,isSignedIn,isAuthenticated}=require("../controllers/auth")

router.param("userId",getUserById)

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)
router.put("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList)


// router.get("/users",getAllUsers)

module.exports=router