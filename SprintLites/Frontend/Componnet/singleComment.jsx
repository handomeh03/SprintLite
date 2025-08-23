import { UseUser } from "../Context/userContext";
import {
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { UseDeletecomment } from "../hoooks/useDeleteComment";
export default function SingleComment({c}) {
    let{user}=UseUser();
    let{deleteComment}=UseDeletecomment();
    function handleDeleteComment(){
        deleteComment(c._id);
    }
  return (
    <ListItem key={c._id} divider>
      <ListItemText
        primary={c.body}
        secondary={`by ${c.author.name || "Unknown"}`}
      />
      <ListItemSecondaryAction>
        {user.user.id == c.author._id ? (
          <IconButton onClick={handleDeleteComment} edge="end">
            <DeleteIcon color="error" />
          </IconButton>
        ) : (
          ""
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
}
