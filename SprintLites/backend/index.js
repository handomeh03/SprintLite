import express from "express";
import dotenv from "dotenv";
import { init } from "./db/connection.js";
import { authRouter } from "./Routes/authRouter.js";
import { userRouter } from "./Routes/userRouter.js";
import { Auth } from "./Middleware/AuthMiddleware.js";
dotenv.config();
const app=express();
app.use(express.json());

const PORT=process.env.PORT;

app.use((req,res,next)=>{
    console.log(req.method);
    console.log(res.url);
    next();
})

app.use("/api/auth",authRouter);
app.use("/api/users",Auth,userRouter)





init().then(()=>{
   app.listen(PORT,()=>{
    console.log("the server is run at PORT "+ PORT);
}) 
}).catch((e)=>{
    console.log(e)
})
