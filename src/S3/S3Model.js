const mongoose = require("mongoose")

const s3Schema= new mongoose.Schema({
    accessKeyId:{ type:String },
    secretAccessKey:{ type: String },
    createdAt:{type:Date, default:Date.now}
},
{collection:'s3'}
)
const S3Model=mongoose.model("s3",s3Schema);
module.exports =S3Model;