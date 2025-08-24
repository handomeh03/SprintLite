import { Comment } from "../Model/Comment.js";

export async function authorizeCommentDelete(req, res, next) {
  const { id: commentId } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).send({ error: "Comment not found" }); 
    }

    const isAuthor = comment.author.toString() === userId;
    const isAdmin = userRole === "admin";

    if (!isAuthor && !isAdmin) {
      return res.status(403).send({ error: "You are not authorized to delete this comment" }); 
    }

    req.comment = comment;
    next(); 
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}
