import express from "express";
import { adduser, createProject, deletemember, listProject } from "../Controller/ProjectController.js";
import { adminMangerCheck } from "../Middleware/adminMangercheck.js";
export const ProjectRouter=express.Router();


ProjectRouter.post("/createProject",adminMangerCheck,createProject);
ProjectRouter.get("/listProject",listProject);
ProjectRouter.post("/:id/members",adminMangerCheck,adduser)
ProjectRouter.delete("/:id/member/:userId",adminMangerCheck,deletemember)