import express from "express";
import { adduser, createProject, deletemember, listProject } from "../Controller/ProjectController.js";
import { adminMangerCheck } from "../Middleware/adminMangercheck.js";
import { changeStatus, createSprint, getAllSprint } from "../Controller/SprintController.js";
import { addissue, deleteIssue, getDetailsofissuse, getProjectIssues } from "../Controller/issuesController.js";
export const ProjectRouter=express.Router();

//for create project and mangeuser
ProjectRouter.post("/createProject",adminMangerCheck,createProject);//deon
ProjectRouter.get("/listProject",listProject);//done
ProjectRouter.post("/:id/members",adminMangerCheck,adduser)//done
ProjectRouter.delete("/:id/member/:userId",adminMangerCheck,deletemember)//done

// for sprint
ProjectRouter.post("/:id/sprints",adminMangerCheck,createSprint)//done
ProjectRouter.patch("/sprints/:id/status",adminMangerCheck,changeStatus)//done
ProjectRouter.get("/:id/sprints",getAllSprint)//done

//for issuse
ProjectRouter.post("/:id/issuse",addissue);//done
ProjectRouter.get("/:id/issuse/:sprintId",getProjectIssues);//done
ProjectRouter.get("/issues/:id",getDetailsofissuse);//done
// ProjectRouter.patch("/issues/:id",adminMangerCheck,updateIssuse);// need solve
ProjectRouter.delete("/issues/:id",adminMangerCheck,deleteIssue);//done
