const { ErrorHandler } = require('../Exception/error');
const S3Service = require('../S3/S3Service');
const FileModel = require('./FileModel');
class FileController {
  constructor() { }
  async saveFile(req, res, next) {
    let fileName = req.params.fileName;
    const file_count = await FileModel.countDocuments({ fileName });
    if (file_count > 0) {
      return next(new ErrorHandler(401, "Sorry file name already exists"));
    }
    const s3Service = new S3Service();
    await s3Service.getSignedUrl(fileName, (signedUrldata) => {
      //console.log(signedUrldata)
      const new_file = { fileName, url: signedUrldata.url }
      FileModel.create(new_file);
      new_file.signedUrl = signedUrldata.signedRequest;
      res.send(new_file);
    }, next);
  }
  async deleteFile(req, res, next) {
    const _id = req.params._id;
    const file = await FileModel.findByIdAndDelete(_id);
    if (!file) {
      return next(new ErrorHandler(401, "Sorry file not found"));
    }
    res.send(file);
  }
  async getAllFiles(req, res, next) {
    const files = await FileModel.find().sort({ createdAt: "DESC" });
    if (files.length<1) {
      return next(new ErrorHandler(401, "Sorry No files found"));
    }
    res.send(files);
  }
}
module.exports = FileController