import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  key: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true, 
    trim: true 
  },
  description: { 
    type: String, 
    default: null 
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",  
    required: true 
  },
  members: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"   
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


const Project = mongoose.model("Project", projectSchema);

export default Project;
