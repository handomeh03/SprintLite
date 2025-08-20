import validator from "validator";
import bcrypt from "bcrypt";
import { User } from "../Model/user.js";
import { createJWT } from "../utlis/createJWT.js";

export async function register(req, res) {
  let { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ error: "please fill all input" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send({ error: "the email not correct" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).send({ error: "the password not strong" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ error: "email already exists" });
    }

    let salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(password, salt);

    // مباشرة انشاء يوزر
    const createUser = await User.create({
      name,
      email,
      passwordHash: hashpassword,
      role: role || "member", // default role
    });

    const { _id, role: userRole } = createUser;

    const token = createJWT(_id, name, email, userRole);

    res.status(201).send({
      message: "User registered successfully",
      user: {
        id: _id,
        name,
        email,
        role: userRole,
      },
      token,
    });

  } catch (error) {
    res.status(500).send({ error: "server error", details: error.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).send({ error: "please provide email and password" });
  }

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "email not found" });
    }

    
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).send({ error: "invalid password" });
    }

    let {_id,name,role}=user;

    
    const token = createJWT(_id, name, email, role);

   
    res.status(200).send({
      message: "login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (error) {
    res.status(500).send({ error: "server error", details: error.message });
  }
}
export async function Me(req,res) {
  let user=req.user;
  if(user){
   return  res.status(200).send({user});
  }
  return res.status(404).send({error:"error to get data"})

}
export async function getalluser(req,res) {
   try {
    const alluser = await User.find();
    res.status(200).send({users:alluser});
    
   } catch (error) {
    res.status(404).send({error});
   }
}