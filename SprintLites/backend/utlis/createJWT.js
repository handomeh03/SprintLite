import jwt from "jsonwebtoken";
export function createJWT(id,name,email,role){
    return jwt.sign({id,name,email,role},process.env.SECRETKEY,{expiresIn:"15m"});
}