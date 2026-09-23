const JWT = require("jsonwebtoken");

const dotenv = require("dotenv")

dotenv.config();

const secret = process.env.JWT_SECRET

const authMiddleware = (req,res,next)=> {
    const authHeader = req.headers.authorization
    
    if(authHeader){
        const token = authHeader.split(" ")[1];

        try{
            const valid = JWT.verify(token, secret);
            if(valid){
                next();
            }
        } catch(error){
            return res.status(401).json({
                error:"Invalid or expired token"
            });
        }
    }else{
        res.status(401).json({error: "No Authorization header"

        });
    }
    

}

module.exports = authMiddleware;