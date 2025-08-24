import validator from "validator";
import bcrypt from "bcrypt";
import { User } from "../Model/user.js";
import { createJWT } from "../utlis/createJWT.js";

export async function register(req, res) {
  let { name, email, password, role, avatarUrls } = req.body;

  if (!name || !email || !password) {
    return res.status(422).send({ error: "please fill all input" });
  }

  if (!validator.isEmail(email)) {
    return res.status(422).send({ error: "the email is not correct" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(422).send({ error: "the password is not strong" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).send({ error: "email already exists" }); 
    }

    let salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(password, salt);
   
    const newUser = {
      name,
      email,
      passwordHash: hashpassword,
      role: role || "member",
      avatarUrl: avatarUrls || null
    };

    const user = await User.create(newUser);
    const { _id, createdAt, avatarUrl } = user;

    const token = createJWT(_id, name, email, role, avatarUrl, createdAt);

    res.status(201).send({ 
      user: {
        id: _id,
        name,
        email,
        role,
        avatarUrl,
        createdAt
      },
      token
    });

  } catch (error) {
    res.status(500).send({ error: "server error", details: error.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "please provide email and password" });
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

    const { _id, name, role, avatarUrl, createdAt } = user;
    const token = createJWT(_id, name, email, role, avatarUrl, createdAt);

    res.status(200).send({
      user: { id: _id, name, email, role, avatarUrl, createdAt },
      token
    });

  } catch (error) {
    res.status(500).send({ error: "server error", details: error.message });
  }
}

export async function Me(req, res) {
  let user = req.user;
  let finduser = await User.findById(user.id);
  if (!finduser) {
    return res.status(404).send({ error: "user not found" }); // بدل "error to get data"
  }
  const { _id, name, email, role, avatarUrl, createdAt } = finduser;
  return res.status(200).send({
    user: { id: _id, name, email, role, avatarUrl, createdAt }
  });
}

export async function getalluser(req, res) {
  try {
    const alluser = await User.find();
    res.status(200).send({ users: alluser });
  } catch (error) {
    res.status(500).send({ error: "server error", details: error.message }); 
  }
}
