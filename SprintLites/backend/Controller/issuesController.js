import { Issue } from "../Model/issuse.js";
import { Project } from "../Model/Project.js";
import { Sprint } from "../Model/Sprint.js";
import mongoose from "mongoose";

export async function addissue(req, res) {
  let { id: projectid } = req.params;
  let user = req.user;
  let { sprintId, type, title, description, assignee, priority, status } =
    req.body;
  if (!projectid) {
    return res.status(400).send({ error: "please fill all input" });
  }
  if (!type) {
    return res.status(400).send({ error: "please fill all input" });
  }
  if (!title) {
    return res.status(400).send({ error: "please fill all input" });
  }
  if (!priority) {
    return res.status(400).send({ error: "please fill all input" });
  }
  if (!status) {
    return res.status(400).send({ error: "please fill all input" });
  }

  if (!mongoose.Types.ObjectId.isValid(projectid)) {
    return res.status(400).send({ error: "Invalid project id" });
  }
  if (sprintId && !mongoose.Types.ObjectId.isValid(sprintId)) {
    return res.status(400).send({ error: "Invalid sprint id" });
  }
  if (assignee && !mongoose.Types.ObjectId.isValid(assignee)) {
    return res.status(400).send({ error: "Invalid assignee id" });
  }

  try {
    let project = await Project.findById(projectid);
    if (!project) {
      return res.status(400).send({ error: "project not found" });
    }
    let sprint = await Sprint.findById(sprintId);
    if (!sprint) {
      return res.status(404).send({ error: "the sprint id not found" });
    }
    const newIssue = {
      project: projectid,
      sprint: sprintId,
      type,
      title,
      description: description || null,
      assignee: assignee || null,
      reporter: user.id,
      priority,
      status,
    };
    const issue = await Issue.create(newIssue);
    const populatedIssue = await Issue.findById(issue._id)
      .populate("project", "name")
      .populate("sprint", "name startDate endDate status")
      .populate("reporter", "name email")
      .populate("assignee", "name email"); 

    return res.status(200).send({ issue: populatedIssue });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "server error" });
  }
}
export async function getProjectIssues(req, res) {
  try {
    const { id: projectId ,sprintId} = req.params;
    const { status, assignee} = req.query;

   
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).send({ error: "Project not found" });
    }

    
    const filter = { project: String(projectId) };

    if (status) filter.status = String(status);
    if (assignee) filter.assignee = String(assignee);
    if (sprintId) filter.sprint = String(sprintId); 

    const issues = await Issue.find(filter)
      .populate("project", "name")
      .populate("assignee", "name email")
      .populate("reporter", "name email")
      .populate("sprint", "name startDate endDate status");

    return res.status(200).send({ issues });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
}


export async function getDetailsofissuse(req, res) {
  let { id: issuesID } = req.params;
  try {
    const issues = await Issue.findById(issuesID)
      .populate("project")
      .populate("sprint")
      .populate("assignee")
      .populate("reporter");
    res.status(200).send({ issues });
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

    return res.status(200).send({ Issue: issue });
  } catch (error) {
    console.error("Error deleting issue:", error);
    return res.status(500).send({ error: "Server error" });
  }
}
