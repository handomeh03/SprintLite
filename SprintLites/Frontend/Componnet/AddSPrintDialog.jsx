import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function AddSPrintDialog({flag,handleFlag,name,startDate,endDate,goal,status,handleName,handlestartDate,handleenddate,handleGoal,handlestatus,handleAddsprint}){
    
    return(
         <Dialog open={flag}>
          <DialogTitle>add sprint</DialogTitle>
          <DialogContent>
            <form id="subscription-form">
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Sprint Name"
                type="text"
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => handleName(e.target.value)}
              />
        
              <TextField
                required
                margin="dense"
                id="startDate"
                name="startDate"
                label="Start Date"
                type="date"
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => handlestartDate(e.target.value)}
              />
        
              <TextField
                required
                margin="dense"
                id="endDate"
                name="endDate"
                label="End Date"
                type="date"
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={(e) => handleenddate(e.target.value)}
              />
        
              <TextField
                required
                margin="dense"
                id="goal"
                name="goal"
                label="Goal"
                type="text"
                fullWidth
                variant="standard"
                value={goal}
                onChange={(e) => handleGoal(e.target.value)}
              />
        
              <TextField
                required
                margin="dense"
                id="status"
                name="status"
                label="Status"
                type="text"
                fullWidth
                variant="standard"
                value={status}
                onChange={(e) => handlestatus(e.target.value)}
              />
        
             
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleFlag(false)}>Cancel</Button>
            <Button onClick={handleAddsprint} type="submit" form="subscription-form">
              add
            </Button>
          </DialogActions>
        </Dialog>
    );
}