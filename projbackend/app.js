require('dotenv').config()
const mongoose = require('mongoose');
const express=require("express")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
//

//my routes
const authRoutes=require("./routes/auth")
const userRoutes=require("./routes/user")
const categoryRoutes=require("./routes/category")
const productRoutes=require("./routes/product")





const app=express()

//db connection
mongoose.connect(process.env.DATABASE ,{
useNewUrlParser: true ,
useUnifiedTopology: true ,
useCreateIndex:true
})
.then(()=>{
    console.log("DB Connected")
})

//middleware
app.use(bodyParser.json())
// app.use(express.json())
app.use(cookieParser())
app.use(cors())

//my routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)




//port
let port=process.env.PORT||8080

//server started
app.listen(port,()=>{
    console.log(`port will runn ${port}`)
})
// { useNewUrlParser: true }
// { useUnifiedTopology: true }