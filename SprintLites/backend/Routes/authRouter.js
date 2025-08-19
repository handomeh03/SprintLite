import express from "express";
import { getalluser, login, Me, register } from "../Controller/AuthConttroller.js";
import { Auth } from "../Middleware/AuthMiddleware.js";
export const authRouter=express.Router();
authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.get("/me",Auth,Me)
authRouter.get("/alluser",getalluser)