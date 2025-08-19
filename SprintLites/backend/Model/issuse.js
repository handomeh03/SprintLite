import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Project", 
    required: true 
  },
  sprint: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Sprint", 
    default: null 
  },
  type: { 
    type: String, 
    enum: ["task", "bug"], 
    required: true 
  },
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    default: null 
  },
  assignee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    default: null 
  },
  reporter: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  priority: { 
    type: String, 
    enum: ["low", "medium", "high"], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["todo", "in_progress", "done"], 
    default: "todo", 
    required: true 
  },
  points: { 
    type: Number, 
    default: null 
  },
}, { timestamps: true }); 

export const Issue = mongoose.model("Issue", issueSchema);


