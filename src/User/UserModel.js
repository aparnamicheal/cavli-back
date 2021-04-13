const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
    userName:{ type:String },
    password:{ type: String },
},
{collection:'user'}
)
const UserModel=mongoose.model("user",userSchema);
module.exports =UserModel;