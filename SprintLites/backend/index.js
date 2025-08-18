import express from "express";
import dotenv from "dotenv";
import { init } from "./db/connection.js";
import { User } from "./Model/user.js";
dotenv.config();
const app=express();
app.use(express.json());

const PORT=process.env.PORT;





init().then(()=>{
   app.listen(PORT,()=>{
    console.log("the server is run at PORT "+ PORT);

}) 
}).catch((e)=>{
    console.log(e)
})
