import { Issue } from "../Model/issuse.js";
import { Project } from "../Model/Project.js";
import { Sprint } from "../Model/Sprint.js";

export async function addissue(req,res) {
    let {id:projectid}=req.params;
    let user=req.user;
    let {sprintId,type,title,description,assignee,priority,status}=req.body;
    if(!projectid){
      return  res.status(400).send({error:"please enter the project id"});
    }
    if(!type){
        return  res.status(400).send({error:"please enter the type of issues"}); 
    }
    if(!title){
        return res.status(400).send({error:"please enter the title of issuse"});
    }
    if(!priority){
        return res.status(400).send({error:"please enter the priority of issuse"});
    }
    if(!status){
      return  res.status(400).send({error:"please enter the status of the issuses"});
    }
    try {
    
        let project= await Project.findById(projectid);
        if(!project){
            return res.status(400).send({error:"project not found"});
        }
        let sprint=await Sprint.findById(sprintId);
        if(!sprint){
            return res.status(404).send({error:"the sprint id not found"});
        }
        const newIssue={
            project:projectid,
            sprint:sprintId,
            type,
            title,
            description:description || null,
            assignee: assignee || null,
            reporter:user._id,
            priority,
            status
        }
        const issue=await Issue.create(newIssue);
        return res.status(200).send({issue})

        
    } catch (error) {
       console.error(error);
       res.status(500).send({ error: "server error" });
    }

}
export async function getProjectIssues(req, res) {
  try {
    const { id: projectId } = req.params;
    const { status, assignee, sprint } = req.query; 

   
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).send({ error: "project not found" });
    }

   
    const filter = { project: projectId };

    if (status) filter.status = status;
    if (assignee) filter.assignee = assignee;
    if (sprint) filter.sprint = sprint;

    
    const issues = await Issue.find(filter)
      .populate("assignee", "name email") 
      .populate("reporter", "name email") 
      .populate("sprint", "name startDate endDate status");

    return res.status(200).send({ issues });

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "server error" });
  }
}
export async function getDetailsofissuse(req,res) {
    let {id:issuesID}=req.params;
    try {
        const issues=await Issue.findById(issuesID)
      .populate("project")
      .populate("sprint")
      .populate("assignee")
      .populate("reporter");
        ;
        res.status(200).send({issues})
        
    } catch (error) {
     console.error(error);
    res.status(500).send({ error: "server error" });
    }
}

export async function deleteIssue(req, res) {
  const { id: issueId } = req.params;
  const userRole = req.user.role;

  try {
    const issue = await Issue.findById(issueId);

    if (!issue) {
      return res.status(404).send({ error: "Issue not found" });
    }

   
    await Issue.findByIdAndDelete(issueId);

    return res.status(200).send({deletedIssue:issue });

  } catch (error) {
    console.error("Error deleting issue:", error);
    return res.status(500).send({ error: "Server error" });
  }
}
