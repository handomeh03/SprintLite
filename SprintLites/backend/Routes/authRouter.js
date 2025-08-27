import express from "express";
import { getalluser, login, Me, register } from "../Controller/AuthConttroller.js";
import { Auth } from "../Middleware/AuthMiddleware.js";
import { limiterLogin } from "../Middleware/rateLimitforLogin.js";
import { registerSchema, registerValid } from "../Middleware/RegisterValidation.js";
import { loginSchema, loginvalidate } from "../Middleware/loginvalidation.js";
export const authRouter=express.Router();

authRouter.post("/register",registerValid(registerSchema),register) 
authRouter.post("/login",limiterLogin,loginvalidate(loginSchema),login)
authRouter.get("/me",Auth,Me)
authRouter.get("/alluser",getalluser)