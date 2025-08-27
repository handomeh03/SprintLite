import express from "express";
import { adduser, createProject, deletemember, listProject } from "../Controller/ProjectController.js";
import { adminMangerCheck } from "../Middleware/adminMangercheck.js";
import { changeStatus, createSprint, getAllSprint } from "../Controller/SprintController.js";
import { addissue, deleteIssue, getDetailsofissuse, getProjectIssues } from "../Controller/issuesController.js";
export const ProjectRouter=express.Router();

//for create project and mangeuser
ProjectRouter.post("/createProject",adminMangerCheck,createProject);
ProjectRouter.get("/listProject",listProject);
ProjectRouter.post("/:id/members",adminMangerCheck,adduser)
ProjectRouter.delete("/:id/member/:userId",adminMangerCheck,deletemember)

// for sprint
ProjectRouter.post("/:id/sprints",adminMangerCheck,createSprint)
ProjectRouter.patch("/sprints/:id/status",adminMangerCheck,changeStatus)
ProjectRouter.get("/:id/sprints",getAllSprint)

//for issuse
ProjectRouter.post("/:id/issuse",addissue);
ProjectRouter.get("/:id/issuse/:sprintId",getProjectIssues);
ProjectRouter.get("/issues/:id",getDetailsofissuse);
// ProjectRouter.patch("/issues/:id",adminMangerCheck,updateIssuse);// need solve
ProjectRouter.delete("/issues/:id",adminMangerCheck,deleteIssue);
