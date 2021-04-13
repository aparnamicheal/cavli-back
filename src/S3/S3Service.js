const aws = require('aws-sdk');
const { ErrorHandler } = require('../Exception/error');
const S3Model = require('./S3Model');
class S3Service {
  constructor() { }

  async getSignedUrl(fileName, fn, next) {
    const credentials = await S3Model.find().sort({ createdAt: "DESC" });
    console.log(credentials.length);
    if (credentials.length<1) {
      return next(new ErrorHandler(401, "Sorry s3 credentials doesnt exists"));
    }
    const accessKeyId = credentials[0].accessKeyId;
    const secretAccessKey = credentials[0].secretAccessKey;
    console.log(credentials);
    aws.config.update({
      accessKeyId,
      secretAccessKey,
      region: 'ap-south-1',
      signatureVersion: 'v4'
    });
    const s3 = new aws.S3();
    const S3_BUCKET = process.env.S3_BUCKET;
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return err;
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      fn(returnData);
    });
  }
  async saveCredentials(req, res, next) {
    // let credentials =await S3Model.find().sort({ createdAt: "DESC" });
    // if (credentials) {
    //   return next(new ErrorHandler(401, "Sorry credentials already exists"));
    // }
    const accessKeyId = req.body.accessKeyId;
    const secretAccessKey = req.body.secretAccessKey;

    if (!accessKeyId || !secretAccessKey) {
      return next(new ErrorHandler(401, "Credentials Required"));
    }
    aws.config.update({
      accessKeyId,
      secretAccessKey,
      region: 'ap-south-1',
      signatureVersion: 'v4'
    });
    const s3 = new aws.S3();
    s3.headBucket({
      Bucket: process.env.S3_BUCKET
    },function (err, data) {
      if (err) {
        console.log("invalid cred");
        return next(new ErrorHandler(401, "Invalid Credentials"));
      } 
      else{
        console.log("valid cred");
        //res.send("valid cred")
        let credentials = { accessKeyId, secretAccessKey };
        S3Model.create(credentials)
        res.send(credentials);
      }
    });
  }
  async isCredentialsExist(req, res, next){
    const credentials = await S3Model.find();
    console.log(credentials.length);
    if (credentials.length<1) {
      return next(new ErrorHandler(401, "Sorry s3 credentials doesnt exists"));
    }
    else{
      res.send({message:"S3 credentials exists"})
    }
  }
}
module.exports = S3Service