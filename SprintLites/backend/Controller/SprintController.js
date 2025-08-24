import { Project } from "../Model/Project.js";
import { Sprint } from "../Model/Sprint.js";

export async function createSprint(req, res) {
  let { id: projectid } = req.params;
  let { name, startDate, endDate, goal, status } = req.body;
  if (!name || !startDate || !endDate) {
    return res.status(422).send({ error: "Name, startDate, and endDate are required" });
  }

  const sprint = {
    project: projectid,
    name,
    startDate,
    endDate,
    goal: goal || "null",
    status: status || "planned",
  };

  try {
    const project = await Project.findById(projectid);
    if (!project) {
      return res.status(404).send({ error: "Project not found" });
    }

    const newSprint = await Sprint.create(sprint);
    return res.status(201).send({ sprint: newSprint });
  } catch (error) {
    console.error("Error creating sprint:", error);
    res.status(500).send({ error: error.message || "Internal server error" });
  }
}

export async function changeStatus(req, res) {
  const { id: sprintId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(422).send({ error: "Status is required" });
  }

  try {
    const sprint = await Sprint.findById(sprintId);
    if (!sprint) {
      return res.status(404).send({ error: "Sprint not found" });
    }

    const updatedSprint = await Sprint.findByIdAndUpdate(
      sprintId,
      { status },
      { new: true }
    );

    return res.status(200).send({ sprint: updatedSprint });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export async function getAllSprint(req, res) {
  let { id: projectid } = req.params;
  let user = req.user;

  try {
    const project = await Project.findById(projectid);
    if (!project) {
      return res.status(404).send({ error: "Project not found" });
    }

    const isOwner = project.owner?.toString() === user.id;
    const isMember = project.members.some(
      (memberId) => memberId.toString() === user.id
    );

    if (!isOwner && !isMember) {
      return res.status(403).send({ error: "Not allowed" });
    }

    const sprint = await Sprint.find({ project: projectid });
    if (sprint.length === 0) {
      return res.status(404).send({ error: "This project doesn't have sprints" });
    }

    return res.status(200).send({ sprints: sprint });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
