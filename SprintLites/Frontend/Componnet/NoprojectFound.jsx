import { useState } from "react";
import { UseUser } from "../Context/userContext";
import style from "../Css/NoProjectFound.module.css";
import { UseCreateProject } from "../hoooks/useCreateProject";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
export default function NoProjectFound(){
    let [flag,setflag]=useState(false);
      let[name,setName]=useState("");
      let[key,setKey]=useState("");
      let[description,setdescription]=useState("");
      let [member,setmember]=useState("");
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
  let {user}=UseUser();
    return(
        <div>
          <div className={style.NoProjectFound}>
          <h2>no project found</h2>
          {user?.user.role==="admin" || user?.user.role=="manager" ? <p>do you want add projet ? <button onClick={()=>{
            setflag(true);
            handleCreateProject();
          }} className={style.btnADD}>add</button></p>:""}
          
          
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
              required
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