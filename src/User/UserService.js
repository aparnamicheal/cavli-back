const jwt= require('json-web-token')
class UserService{
    login(req,res,next){
        const userName=req.body.userName;
        const password=req.body.password;
        if(!userName||!password){
            return next(new ErrorHandler(401, "Invalid credentials"));
        }
        let payload = {userName};
        const accessToken=jwt.sign(payload,process.env.TOKEN_SECRET,{
            algorithm:"HS256",
            expiresIn:process.env.TOKEN_EXPIRY
        })
        res.send({accessToken,userName});
    }
}