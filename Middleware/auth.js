const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

const auth=async(req,res,next)=>{
    // const token=req.headers.user_access_token 
    const token=req.headers.user_access_token
    // console.log(token)
    if(token){
        try{
            const {user_id}=jwt.verify(token,"shubhbknljfnlwfln")
            // const user_id=jwt.verify(token)
            req.users=user_id;
        }catch(e){
            return res.send({
                success: false,
                message:e.message
            })
        }
    }else{
        return res.send({
            success: false,
            message:'UnAuthorized'
        })
    }
    next();
}

module.exports=auth;


// module.exports = router
