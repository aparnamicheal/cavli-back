var express = require('express');
var bodyParser = require('body-parser')
const FileService = require('./File/FileService');
const S3Service = require('./S3/S3Service');
require('dotenv').config()
const cors = require("cors");
class App {
    constructor() {
        this.express = express();
        this.setMiddleWares();
        this.setRoutes();
        this.express.use(( error, req, res, next ) => {
            res.locals.error = error;
            res.status(404).send({error});
          });
    }
    setMiddleWares() {
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());
        this.express.use(cors({
            origin: "*",
            allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, csrf-token, Authorization",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            credentials: true
        }));
    }
    setRoutes() {
        const fileService = new FileService();
        const s3Service = new S3Service();

        this.express.post("/s3/save-cred", s3Service.saveCredentials);
        this.express.get("/s3/cred-exists", s3Service.isCredentialsExist);
        this.express.post("/:fileName", fileService.saveFile)
        this.express.get("/", fileService.getAllFiles);
        this.express.delete("/:_id", fileService.deleteFile);
        
    }
}
module.exports = App