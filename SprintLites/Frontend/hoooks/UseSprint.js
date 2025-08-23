import { useNavigate } from "react-router-dom";
import { UseSprintContext } from "../Context/SprintContext";
import { UseUser } from "../Context/userContext";
export function UseSprint() {
    let navigate=useNavigate();
    let {user}=UseUser();
    let{SprintDispatch}=UseSprintContext();
    
  async function sprints(projectid) { 
    try {
      const res = await fetch(
        `http://localhost:8080/api/project/${projectid}/sprints`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
       const data =await res.json();
        if(res.ok){
            SprintDispatch({type:"fetchSprint",payload:data.sprints})
           navigate("/sprints");
          
        }
        else{
           alert(data.error);
        }
    } catch (error) {
      alert(error);
    }
  }
  return {sprints};
}
