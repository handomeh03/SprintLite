import express from "express";
import { updateProfile, updateRole } from "../Controller/userController.js";
import { canUpdate } from "../Middleware/Canupdateprofile.js";
import { CanupdateRole } from "../Middleware/CanupdateRole.js";
export const userRouter=express.Router();
userRouter.patch("/:id",canUpdate,updateProfile);
userRouter.patch("/:id/role",CanupdateRole,updateRole);