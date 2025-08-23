
import IssueCard from "../Componnet/IssueCard";
import style from "../Css/Issues.module.css";
import AddIcon from "@mui/icons-material/Add";

import { UseIssues } from "../hoooks/useIssues";
import { UsecontextIssues } from "../Context/IssuesContext";
import NoIssuesFound from "../Componnet/NoIssusesFound";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { UseCreateIssues } from "../hoooks/useCreateIssues";


export default function Issues() {
 let[flag,setFlag]=useState(false);
 let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [assign, setAssign] = useState("");
  let [proirty, setProirty] = useState("");
  let [status, setStatus] = useState("");
  let [type, setType] = useState("");
  let{addissues}=UseCreateIssues();
  UseIssues();

  let {Issues}=UsecontextIssues();

  function handleCreateIssue(e){
     e.preventDefault();
    addissues(title,description,assign,proirty,status,type);
    setFlag(false);
  }
  if(!Issues || Issues.length==0){
    return(
      <NoIssuesFound/>
    );
  }

  return (
    <div>
      <div className={style.search}>
        <button onClick={()=>{setFlag(true)}} className={style.AddBtn}>
          <AddIcon />
        </button>
      </div>
      <div className={style.list}>
        {Issues?.map((e)=>{
          return <IssueCard key={e._id} Issues={e}/>
        })}
      </div>
      <Dialog open={flag}>
              <DialogTitle>Add issues</DialogTitle>
              <DialogContent>
                <form id="subscription-form">
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="title"
                    label="title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="type"
                    label="type"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    name="description"
                    label="description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <TextField
                    autoFocus
                    
                    margin="dense"
                    id="assignee"
                    name="assignee"
                    label="assignee"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={assign}
                    onChange={(e) => {
                      setAssign(e.target.value);
                    }}
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="priority"
                    name="priority"
                    label="priority"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={proirty}
                    onChange={(e) => {
                      setProirty(e.target.value);
                    }}
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="status"
                    name="status"
                    label="status"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setFlag(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateIssue}  type="submit" form="subscription-form">
                  add
                </Button>
              </DialogActions>
            </Dialog>
    </div>
  );
}
