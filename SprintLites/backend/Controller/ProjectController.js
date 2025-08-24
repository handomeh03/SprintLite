import { Project } from "../Model/Project.js";
import { User } from "../Model/user.js";
export async function createProject(req, res) {
  let { name, key, description, membersEmail } = req.body; 
  let user = req.user;

  
  if (!name) {
    return res.status(422).send({ error: "Please fill the name of project" });
  }
  if (!key) {
    return res.status(422).send({ error: "Please fill the key of project" });
  }
  if (!description) {
    return res.status(422).send({ error: "Please fill the description of project" });
  }

  try {
    const newProject = {
      name,
      key,
      description,
      owner: user.id, 
      members: [] 
    };

   
    if (Array.isArray(membersEmail) && membersEmail.length > 0) {
      const membersIds = [];
      for (let email of membersEmail) {
        const foundUser = await User.findOne({ email });
        if (foundUser) {
          membersIds.push(foundUser._id);
        } 
      }
      newProject.members = membersIds;
    }

   
    const result = await Project.create(newProject);
    const project=await Project.findById(result._id).populate("owner","name").populate("members","name")
    console.log(project)

    return res.status(201).send({project});
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Server error" });
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
    }).populate("members","name").populate("owner","name")
    if (!projects) {
      res.status(404).send({ error: "no project found" });
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
    return res.status(422).send({ error: "Please provide the project ID" });
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
      return res.status(422).json({ error: "User is already a member of the project" });
    }

    project.members.push(findEmail._id);
    await project.save();

    const updatedProject = await Project.findById(projectid).populate("members", "name");

    return res.status(200).json({ project: updatedProject });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function deletemember(req,res) {
  let {id,userId}=req.params;
  try {
    const project= await Project.findById(id);
    if(!project){
      return res.status(404).send({error:"project not found"});
    }
    const findmember =  project.members.some(
      member => member.toString() === userId
    );
    if(!findmember){
     return  res.status(404).send({error:"member not found"})
    }
    project.members=project.members.filter((e)=>{
      return e.toString()!=userId;
    })

    await project.save();

   return res.status(200).send({deletemember:project});

    
  } catch (error) {
     res.status(500).send({ error});
  }
}
