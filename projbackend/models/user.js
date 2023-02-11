const mongoose=require("mongoose")
const crypto =require('node:crypto');
const { v4: uuidv4 } = require('uuid');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastName:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    encry_password:{
        type:String,
        required:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }

},
{timestamps:true}
);

userSchema.virtual("password")
    .set(function(password){
        this._password=password
        this.salt=uuidv4();
        this.encry_password=this.securePassword(password)
    })
    .get(function(){
        return this._password
    })

userSchema.methods={
    autheticate:function(plainPassword){
        return this.securePassword(plainPassword)===this.encry_password
    },
    securePassword:function(plainPassword){
        if(!plainPassword) return "";
        try{
            return crypto
                .createHmac("sha256",this.salt)
                .update(plainPassword)
                .digest("hex");
        }catch(err){
            return ""
        }
    }
}

module.exports=mongoose.model("User",userSchema)