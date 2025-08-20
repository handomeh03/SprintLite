import express from "express";
import { AddComment, deleteComment, listComment } from "../Controller/CommentController.js";
import { authorizeCommentDelete } from "../Middleware/authorizeCommentDelete.js";
export const CommentRouter=express.Router();
CommentRouter.post("/:id/comment",AddComment);
CommentRouter.get("/:id/comment",listComment);
CommentRouter.delete("/comment/:id",authorizeCommentDelete,deleteComment);
