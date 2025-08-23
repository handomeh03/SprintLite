import { useState } from "react";
import { UseUser } from "../Context/userContext"; 
import { TextField, Button } from "@mui/material";
import style from "../Css/Settings.module.css";
import { UseUpdateProfile } from "../hoooks/useUpdateProfile";

export default function Setting() {
    let [input,setinput]=useState({id:1,name:"jameel"},{id:2,name:"jameel"});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {updateProfile}=UseUpdateProfile();

  function handleupdateProfile(e){
            e.preventDefault();
            updateProfile(name,email,password);
  }

  

  return (
    <div className={style.Settings}>
      <h2>User Settings</h2>
      <form >
        <TextField
          label="Name"
          value={name}
          fullWidth
          margin="normal"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          value={email}
          type="email"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          value={password}
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
          helperText="Leave blank if you don't want to change it"
        />
        <Button onClick={handleupdateProfile} style={{background:"#004d40"}} type="submit" variant="contained" >
          update
        </Button>
      </form>
    </div>
  );
}
