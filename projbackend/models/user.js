const mongoose=requere("mongoose")
const crypto =requere('node:crypto');
import { v4 as uuidv4 } from 'uuid';


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
        this.encry_password=this.securePassword
    })
    .get(function(){
        return this._password
    })

userSchema.method={
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