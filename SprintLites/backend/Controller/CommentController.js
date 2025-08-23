import { Comment } from "../Model/Comment.js";
import { Issue } from "../Model/issuse.js";

export async function AddComment(req,res) {
    let {id:issuesID}=req.params;
    let{body}=req.body;
    let user=req.user;
    try {
        let issues =await Issue.findById(issuesID);
        if(!issues){
            return res.status(400).send({error:"no issues"})
        }
        if(!body || body.trim() === ""){
            return res.status(400).send({error:"please add comment"}) 
        }
        const newComment={
            issue:issuesID,
            author:user.id,
            body:body.trim()
        }
        const addcomment= await Comment.create(newComment);
        let comment=await Comment.findById(addcomment._id).populate("author","name");
        res.status(200).send({comment});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
}
export async function listComment(req, res) {
  const { id: issueId } = req.params;

  try {
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).send({ error: "Issue not found" });
    }

    
    const comments = await Comment.find({ issue: issueId }).populate("author", "name email");

    if (comments.length === 0) {
      return res.status(200).send({ message: "No comments yet", comments: [] });
    }

    return res.status(200).send({ comments });

  } catch (error) {
    console.error("Error listing comments:", error);
    return res.status(500).send({ error: "Server error" });
  }
}

export async function deleteComment(req, res) {
  try {
    const comment = req.comment; 

    await comment.deleteOne();

    return res.status(200).send({
      message: "Comment deleted successfully",
      deletedComment: comment
    });

  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).send({ error: "Server error" });
  }
}

