import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  issue: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Issue", 
    required: true 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  body: { 
    type: String, 
    required: true, 
    trim: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Comment = mongoose.model("Comment", commentSchema);


