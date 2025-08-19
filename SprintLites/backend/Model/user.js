import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  role: {
  type: String,
  enum: ["admin", "manager", "member"],
  default: "member",
  lowercase: true
 },
  avatarUrl: { 
    type: String, 
    default: null 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});
export const User = mongoose.model("User", userSchema);