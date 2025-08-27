import jwt from "jsonwebtoken";
export function createJWT(id,name,email,role,avatarUrl,createdAt){
    return jwt.sign({id,name,email,role,avatarUrl,createdAt},process.env.SECRETKEY,{expiresIn:"30m"});
}
