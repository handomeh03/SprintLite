import Button from "@mui/material/Button";
import { TextField, MenuItem } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function ChangeStatusDialog({
  flag,
  status,
  handleChangeStatus,
  handleChangeFLag,
  changestatus,
}) {
  return (
    <Dialog open={flag}>
      <DialogTitle>change status</DialogTitle>
      <DialogContent>
        <form id="subscription-form">
          <TextField
            select
            autoFocus
            required
            margin="dense"
            id="status"
            name="status"
            label="Status"
            fullWidth
            variant="standard"
            value={status}
            onChange={(e) => handleChangeStatus(e.target.value)}
          >
            <MenuItem value="planned">Planned</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleChangeFLag(false);
          }}
        >
          Cancel
        </Button>
        <Button onClick={changestatus} type="submit" form="subscription-form">
          change
        </Button>
      </DialogActions>
    </Dialog>
  );
}
