import bcrypt from "bcrypt";
import { User } from "../Model/user.js";
import mongoose from 'mongoose';
export async function updateProfile(req,res) {
    let {name,email,password}=req.body;
    let updateData={};
    if(name){
        updateData.name=name;
    }
    if(email){
        updateData.email=email;
    }
    if(password){
        let salt= await bcrypt.genSalt(10)
        let hashpassword= await bcrypt.hash(password,salt);
        updateData.password=hashpassword;
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
        res.status(200).json({ message: "success update", user: updatedUser });
        
    } catch (error) {
         res.status(500).json({ error: error.message });
    }

}
export async function updateRole(req, res) {
  let { role } = req.body;
  let { id } = req.params; 


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid user id" });
  }

  let updateProfile = {};
  if (role) {
    updateProfile.role = role;
  }

  try {
    const newUpdate = await User.findByIdAndUpdate(id, updateProfile, { new: true });
    if (!newUpdate) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send({ user: newUpdate });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
