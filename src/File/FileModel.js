const mongoose = require("mongoose")

const fileSchema= new mongoose.Schema({
    fileName:{ type:String },
    url:{ type: String },
    createdAt:{type:Date, default:Date.now}
},
{collection:'file'}
)
const FileModel=mongoose.model("file",fileSchema);
module.exports =FileModel;