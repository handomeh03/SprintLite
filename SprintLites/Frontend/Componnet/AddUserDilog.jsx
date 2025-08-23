import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function AddUserDilog({flag,email,handleChangeEmail,handleChangeFLag,handleAddUser}){
    return(
        <Dialog open={flag} >
        <DialogTitle>add user</DialogTitle>
        <DialogContent>
          
          <form  id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(e)=>{handleChangeEmail(e.target.value)}}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleChangeFLag(false)}} >Cancel</Button>
          <Button onClick={handleAddUser} type="submit" form="subscription-form">
            add
          </Button>
        </DialogActions>
      </Dialog>
    );
}