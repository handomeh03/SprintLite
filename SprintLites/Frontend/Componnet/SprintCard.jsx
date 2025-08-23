import { Link } from "react-router-dom";
import style from "../Css/SprintCard.module.css";
import ChangeStatusDialog from "./changeStatusDialog";
import { useState } from "react";
import { useChangeStatus } from "../hoooks/useChangestatus";
export default function SprintCard({sprint}){
  let [flag,setflag]=useState(false);
  let[status,setStatus]=useState("");
  let {changeStatus}=useChangeStatus();
  function handleChangeFLag(flag){
    setflag(flag);
  }
  function handleChangeStatus(status){
    setStatus(status);
  }
  function changestatuss(e){
    e.preventDefault();
    changeStatus(status,sprint._id);
    setflag(false);
    setStatus("");

  }

    return (
    <div className={style.SprintCard}>
      <h2 className={style.Name}>{sprint.name}</h2>
      <p>
        <strong>Start: {sprint.startDate.split("T")[0]}</strong> 
      </p>
      <p>
        <strong>End:{sprint.endDate.split("T")[0]}</strong>
      </p>
      <p>
        <strong>Goal: {sprint.goal}</strong> 
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          className={
            sprint.status.toLowerCase() === "completed"
              ? style.Completed
              : style.Ongoing
          }
        >
          {sprint.status}
        </span>
      </p>
      <button
        className={style.ShowButton}
        onClick={()=>{
        sessionStorage.setItem("sprintID",JSON.stringify(sprint._id))
        }}
      >
        <Link to={"/issues"} style={{color:"white",textDecoration:"none"}}>show Issues</Link>
      </button>
      <button
        className={style.ShowButton}
        onClick={()=>{
          setflag(true)
        }}
      >
        change status
      </button>
      <ChangeStatusDialog flag={flag} status={status} handleChangeStatus={handleChangeStatus} handleChangeFLag={handleChangeFLag} changestatus={changestatuss} />
    </div>
  );
}