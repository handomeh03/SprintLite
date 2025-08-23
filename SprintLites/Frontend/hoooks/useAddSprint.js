import { UseSprintContext } from "../Context/SprintContext";
import { UseUser } from "../Context/userContext";

export function UseAddSprint(){
    let {user}=UseUser();
    let{SprintDispatch}=UseSprintContext();
    async function addSprint(name, startDate, endDate, goal, status,id) {
    try {
      const res=await fetch(`http://localhost:8080/api/project/${id}/sprints`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body:JSON.stringify({ name, startDate, endDate, goal, status })

        }
      );
      const data=await res.json();
      if(res.ok){
        SprintDispatch({type:"addSprint",payload:data.sprint})
        
        alert("sprint added")
      }
      else{
        throw new Error(data.error);
      }
      
    } catch (error) {
      alert(error)
    }
  }
  return {addSprint};
}