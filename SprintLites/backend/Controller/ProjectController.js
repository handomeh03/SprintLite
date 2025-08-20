import { Project } from "../Model/Project.js";
import { User } from "../Model/user.js";

export async function createProject(req, res) {
  let { name, key, description, members } = req.body;
  let user = req.user;

  if (!name) {
    return res.status(400).send({ error: "please fill the name of project" });
  }
  if (!key) {
    return res.status(400).send({ error: "please fill the key of project" });
  }
  if (!description) {
    return res
      .status(400)
      .send({ error: "please fill the description of project" });
  }

  try {
    const newProject = {
      name,
      key,
      description,
      owner: user.id,
    };

    if (Array.isArray(members) && members.length > 0) {
      newProject.members = members;
    }

    let result = await Project.create(newProject);

    return res.status(201).send(result);
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
}
export async function listProject(req, res) {
  const user = req.user;
  try {
    const projects = await Project.find({
      $or: [
            { owner: user.id },
           { members: user.id }
          ]
    });
    if (!projects) {
      res.status(400).send({ error: "no project found" });
    }
    return res.status(200).send({ projects });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function adduser(req, res) {
  const { id: projectid } = req.params;
  const { email } = req.body;

  if (!projectid) {
    return res.status(400).send({ error: "Please provide the project ID" });
  }

  try {
    const project = await Project.findById(projectid);
    if (!project) {
      return res.status(404).send({ error: "Project not found" });
    }

    const findEmail = await User.findOne({ email });
    if (!findEmail) {
      return res.status(404).json({ error: "User with this email not found" });
    }

    const isAlreadyMember = project.members.some((memberId) =>
      memberId.equals(findEmail._id)
    );
    if (isAlreadyMember) {
      return res
        .status(400)
        .json({ error: "User is already a member of the project" });
    }

    project.members.push(findEmail._id);
    await project.save();

    return res.status(200).json({ project });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
export async function deletemember(req,res) {
  let {id,userId}=req.params;
  try {
    const project= await Project.findById(id);
    if(!project){
      return res.status(400).send({error:"project not found"});
    }
    const findmember =  project.members.some(
      member => member.toString() === userId
    );
    if(!findmember){
     return  res.status(400).send({error:"member not found"})
    }
    project.members=project.members.filter((e)=>{
      return e.toString()!=userId;
    })

    await project.save();

   return res.status(200).send({project});

    
  } catch (error) {
     res.status(500).send({ error});
  }
}
