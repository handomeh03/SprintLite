import { useEffect, useState } from "react";
import SprintCard from "../Componnet/SprintCard";
import { UseSprintContext } from "../Context/SprintContext";
import style from "../Css/Sprints.module.css";
import { UseUser } from "../Context/userContext";
import AddIcon from "@mui/icons-material/Add";
import AddSPrintDialog from "../Componnet/AddSPrintDialog";
import { UseAddSprint } from "../hoooks/useAddSprint";
export default function Sprints() {
  let { user } = UseUser();
  let { sprint } = UseSprintContext();
  let { SprintDispatch } = UseSprintContext();


  let {addSprint}=UseAddSprint();
  const [flag2, setflag2] = useState(false);
  const [name, setName] = useState("");
   const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [goal, setGoal] = useState("");
    const [status, setStatus] = useState("");


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

  useEffect(() => {
    async function fetchSprint() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/project/${JSON.parse(
            sessionStorage.getItem("projectId")
          )}/sprints`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          SprintDispatch({ type: "fetchSprint", payload: data.sprints });

          console.log(data.sprints);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSprint();
  }, []);

  function handleAddsprint(e) {
    e.preventDefault();
    addSprint(name, startDate, endDate, goal, status,JSON.parse(sessionStorage.getItem("projectId")));
    setflag2(false);
   setName("");
   setStartDate("");
   setEndDate("");
   setStatus("");
   setGoal("");
  }
  return (
    <div>
     
      <div className={style.Sprints}>
        <h1>Sprints</h1>
        {user?.user.role=="manager" || user?.user.role=="admin" ? <button onClick={()=>{setflag2(true)}} className={style.AddBtn}>
          <AddIcon />
        </button>:""}
        <div className={style.ListSprints}>
          {sprint?.map((e) => (
            <SprintCard key={e._id} sprint={e} />
          ))}
        </div>
      </div>
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
