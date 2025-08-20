import jwt from "jsonwebtoken";


export async function Auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    return res.status(403).send({ error: "unauthorized" });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const user = jwt.verify(token, process.env.SECRETKEY);
    
    req.user = user; 
    
    next(); 
  } catch (err) {
    return res.status(401).send({ error: "invalid or expired token" });
  }
}
