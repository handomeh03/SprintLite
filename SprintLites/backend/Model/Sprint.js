import mongoose from "mongoose";

const sprintSchema = new mongoose.Schema({
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Project",  
    required: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  goal: { 
    type: String, 
    default: null 
  },
  status: { 
    type: String, 
    enum: ["planned", "active", "completed"], 
    default: "planned",
    required: true 
  }
});


const Sprint = mongoose.model("Sprint", sprintSchema);

export default Sprint;
