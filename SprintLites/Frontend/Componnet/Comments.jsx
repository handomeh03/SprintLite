import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { UseFetchComment } from "../hoooks/useFetchComment";
import { UseCommnetContext } from "../Context/CommentsContext";
import { UseAddComment } from "../hoooks/useAddComments";
import SingleComment from "./singleComment";

export default function Comments({ id, flag, handlechangeFlag }) {
  const [body, setBody] = useState("");
  let{CommentDispatch}=UseCommnetContext();

  UseFetchComment(id,flag);
  
  let { comments } = UseCommnetContext();

  let { addComment } = UseAddComment();
  function handleAddComment(e){
    e.preventDefault();
     addComment(id, body);
     setBody("");
  }

  return (
    <Dialog open={flag} fullWidth maxWidth="sm">
      <DialogTitle>Comments</DialogTitle>
      <DialogContent dividers>
        <List>
          {comments.length > 0 ? (
            comments.map((c) => (
              <SingleComment key={c._id} c={c}/>
            ))
          ) : (
            <p style={{ fontSize: "14px", color: "gray", textAlign: "center" }}>
              No comments yet
            </p>
          )}
        </List>

        <TextField
          fullWidth
          margin="normal"
          label="Write a comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handlechangeFlag(false);
            CommentDispatch({type:"removeCommentFromState"});
          }}
          style={{ color: "#065f46" }}
        >
          Close
        </Button>
        <Button
          onClick={handleAddComment}
          variant="contained"
          style={{ background: "#065f46" }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
