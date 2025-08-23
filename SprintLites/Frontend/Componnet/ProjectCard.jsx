import { UseUser } from "../Context/userContext";
import style from "../Css/ProjectCard.module.css";
import { UseSprint } from "../hoooks/UseSprint";

import { useState } from "react";
import { UseAddUser } from "../hoooks/useAdduser";
import AddUserDilog from "./AddUserDilog";
import AddSPrintDialog from "./AddSPrintDialog";
import { UseAddSprint } from "../hoooks/useAddSprint";

export default function ProjectCard({ project }) {
  let [flag, setFlag] = useState(false);
  let [flag2, setflag2] = useState(false);
  let [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState("");

  let { sprints } = UseSprint();
  let { adduser } = UseAddUser();
  let {addSprint}=UseAddSprint();
  let { user } = UseUser();
  function handleSprint() {
    sprints(project._id);
  }

  function handleAddUser(e) {
    e.preventDefault();
    adduser(project._id, email);
    setFlag(false);
    setEmail("");
  }
   function handleAddsprint(e) {
    e.preventDefault();
    addSprint(name, startDate, endDate, goal, status,project._id)
    setflag2(false);
   setName("");
   setStartDate("");
   setEndDate("");
   setStatus("");
   setGoal("");
  }

  function handleChangeEmail(email) {
    setEmail(email);
  }

  function handleChangeFLag(flag) {
    setFlag(flag);
  }
 function handleFlag2(flag){
  setflag2(flag);
 }
  function handleName(name) {
    setName(name);
  }
  function handlestartDate(startDate) {
    setStartDate(startDate);
  }
  function handleenddate(endDate) {
    setEndDate(endDate);
  }
  function handleGoal(goal) {
    setGoal(goal);
  }
  function handlestatus(status) {
    setStatus(status);
  }

  

  return (
    <div className={style.ProjectCard}>
      <h2 className={style.Name}>{project.name}</h2>
      <p>
        <strong>Description:</strong> {project.description}{" "}
      </p>
      {user.user.role == "manager" ? (
        <p>
          <strong>Key:</strong> {project.key}
        </p>
      ) : (
        ""
      )}
      <p>
        <strong>Owner:</strong> {project.owner.name}
      </p>
      {project.members && project.members.length > 0 ? (
        <p>
          <strong>Members:</strong>{" "}
          {project.members.map((e) => e.name).join(", ")}
        </p>
      ) : (
        ""
      )}

      <p>
        <strong>Created At:</strong> {project.createdAt.split("T")[0]}
      </p>
      <div className={style.btns}>
        <button
          className={style.ShowButton}
          onClick={() => {
            handleSprint();
            sessionStorage.setItem("projectId", JSON.stringify(project._id));
          }}
        >
          Show Sprints
        </button>
        {user.user.role == "manager" || user.user.role == "admin" ? (
          <button
            onClick={() => {
              setflag2(true);
            }}
            className={style.ShowButton}
          >
            create sprint
          </button>
        ) : (
          ""
        )}
        {user.user.role == "manager" || user.user.role == "admin" ? (
          <button
            onClick={() => {
              setFlag(true);
            }}
            className={style.ShowButton}
          >
            add user
          </button>
        ) : (
          ""
        )}
      </div>

      <AddUserDilog
        flag={flag}
        email={email}
        handleChangeEmail={handleChangeEmail}
        handleChangeFLag={handleChangeFLag}
        handleAddUser={handleAddUser}
      />
      <AddSPrintDialog
        flag={flag2}
        handleFlag={handleFlag2}
        name={name}
        startDate={startDate}
        endDate={endDate}
        goal={goal}
        status={status}
        handleName={handleName}
        handlestartDate={handlestartDate}
        handleenddate={handleenddate}
        handleGoal={handleGoal}
        handlestatus={handlestatus}
        handleAddsprint={handleAddsprint}
      />
    </div>
  );
}
