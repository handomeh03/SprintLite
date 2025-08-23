import express from "express";
import { getalluser, login, Me, register } from "../Controller/AuthConttroller.js";
import { Auth } from "../Middleware/AuthMiddleware.js";
export const authRouter=express.Router();
authRouter.post("/register",register) // done
authRouter.post("/login",login)//done
authRouter.get("/me",Auth,Me)//done
authRouter.get("/alluser",getalluser)//done