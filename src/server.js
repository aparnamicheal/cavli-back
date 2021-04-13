const App = require('./App');
const mongoose = require("mongoose")
try {
    const dev=process.env.DEV;
    let mongoURI = `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`;
    //let mongoURI = "mongodb+srv://user:pass@cluster0.iiyqi.mongodb.net/cavli"
    const mongoURIDev = `mongodb://localhost:27017/${process.env.MONGO_DB}`;
    console.log("Dev : "+dev);
    mongoURI=(dev==="true")?mongoURIDev:mongoURI;
    mongoose.connect(mongoURI, {
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    });
    console.info(`Database connected : ${mongoURI}`);
  } catch (error) {
    console.error("Error while connecting to the database : ", error);
    process.exit(1);
  }
const app= new App();
const port = process.env.PORT || 8082;
app.express.listen(port, function () {
    console.log("Cavli app listening at %s", port)
 })