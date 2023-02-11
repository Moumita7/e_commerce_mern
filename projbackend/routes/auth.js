const express=require("express")
const router=express.Router()
const {signout,signup,signin,isSignedIn}=require("../controllers/auth")
const { body, validationResult } = require('express-validator');


router.post("/signup",
 body('name',"name should be atlist 3 letter").isLength({ min: 3}),
 body('email',"email is requird").isEmail(),
 body('password',"password should be atlist 3 letter").isLength({ min: 3})

 ,signup)

 router.post("/signin",
 body('email',"email is requird").isEmail(),
 body('password',"password is requird").isLength({ min: 1})

 ,signin)
router.get("/signout",signout)


// router.get("/testroute",isSignedIn,(req,res)=>{
//     res.json(req.auth)
// })


module.exports=router
