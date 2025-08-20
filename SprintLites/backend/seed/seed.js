import mongoose from "mongoose";
import { init } from "../db/connection.js";
import { Comment } from "../Model/Comment.js";
import { Issue } from "../Model/issuse.js";
import { Project } from "../Model/Project.js";
import { Sprint } from "../Model/Sprint.js";
import { User } from "../Model/user.js";
import dotenv from "dotenv";
dotenv.config();

async function rundatabase(){
  
await mongoose.connect(process.env.MONGO_URL);

  await Promise.all([
    User.deleteMany({}),
    Project.deleteMany({}),
    Sprint.deleteMany({}),
    Issue.deleteMany({}),
    Comment.deleteMany({})
  ]);

  //user 
   let user = await User.create({
    name:"jameel",
    email:"jameel@gmail.com",
    passwordHash:"12345@abC",
    role:"admin",
    avatarUrl:"null"
   });
   let user2 = await User.create({
    name:"jalal",
    email:"jalal@gmail.com",
    passwordHash:"12345@abC",
    role:"manager",
    avatarUrl:"null"
   });
   let user3 = await User.create({
    name:"handomeh",
    email:"handomeh@gmail.com",
    passwordHash:"12345@abC",
    role:"member",
    avatarUrl:"null"
   });
   //project 

   let project = await Project.create({
    name:"sprintLite",
    key:"13jam",
    description:"make sprint lite project",
    owner:user._id,
    members:[
        user3._id
    ]
   });

   //sprint

   let sprint=await Sprint.create({
    project:project._id,
    name:"hello sprint",
    startDate:"2025-02-22",
    endDate:"2025-10-22",
    goal:"make login page",
    status:"planned"
   });

   //issuse
   let issuse=await Issue.create({
    project:project._id,
    sprint:sprint._id,
    type:"task",
    title:"login",
    description:"make authontication login",
    assignee:user3._id,
    reporter:user2._id,
    priority:"high",
    status:"in_progress",
   })

   // comment 
   let comment = await Comment.create({
    issue:issuse._id,
    author:user3._id,
    body:"hello comment",
   })
}
rundatabase().then(()=>{
    console.log("data base is run");
}).catch((e)=>{
    console.log(e)
})
