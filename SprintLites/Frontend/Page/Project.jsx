import NoProjectFound from "../Componnet/NoprojectFound";
import ProjectCard from "../Componnet/ProjectCard";
import { UseContextProject } from "../Context/ProjectsContext";
import AddIcon from "@mui/icons-material/Add";
import style from "../Css/Projects.module.css";
import { UseProject } from "../hoooks/useProject";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import { UseCreateProject } from "../hoooks/useCreateProject";
import { UseUser } from "../Context/userContext";

export default function Projects() {
  let {user}=UseUser();
  UseProject();
   let [flag,setflag]=useState(false);
   let[name,setName]=useState("");
   let[key,setKey]=useState("");
   let[description,setdescription]=useState("");
   let [member,setmember]=useState("");

   let {projects}=UseContextProject();
   let {createProject}=UseCreateProject();
   
   function handleCreateProject(e){
    e.preventDefault();
    createProject(name,key,description,member);
    setflag(false);
    setName("")
    setKey("")
    setdescription("")
    setmember("")
   }

   

  if (!projects || projects.length === 0) {
    return <NoProjectFound/>;
  }

  

  return (
    <div className={style.Projects}>
      <h1>Projects</h1>
       {user?.user.role=="admin" || user?.user.role=="manager"?<button onClick={()=>{setflag(true)}} className={style.AddBtn}>
          <AddIcon />
        </button>:""}
      <div className={style.ListProjects}>
        {projects?.map((e) => (
          <ProjectCard key={e._id} project={e} />
        ))}
      </div>
       <Dialog open={flag} >
        <DialogTitle>add project</DialogTitle>
        <DialogContent>
          <form id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
             <TextField
              autoFocus
              required
              margin="dense"
              id="key"
              name="key"
              label="key"
              type="text"
              fullWidth
              variant="standard"
              value={key}
              onChange={(e)=>{setKey(e.target.value)}}
            />
             <TextField
              autoFocus
              required
              margin="dense"
              id="description"
              name="description"
              label="description"
              type="text"
              fullWidth
              variant="standard"
              value={description}
              onChange={(e)=>{setdescription(e.target.value)}}
            />
             <TextField
              autoFocus
              margin="dense"
              id="email"
              name="add user by email"
              label="add member"
              type="email"
              fullWidth
              variant="standard"
              value={member}
              onChange={(e)=>{setmember(e.target.value)}}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setflag(false)}}>Cancel</Button>
          <Button  onClick={handleCreateProject} type="submit" form="subscription-form">
            add 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
