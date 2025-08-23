import { UseSprintContext } from "../Context/SprintContext";
import { UseUser } from "../Context/userContext";

export function useChangeStatus() {
    let {user}=UseUser();
    let{SprintDispatch}=UseSprintContext();
  async function changeStatus(status,id) {
    try {
      const res = await fetch(
        `http://localhost:8080/api/project/sprints/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body:JSON.stringify({status})
        }
      );
      const data=await res.json();
      if(res.ok){
        SprintDispatch({type:"changeStatus",payload:data.sprint});
      }
      else{
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error);
    }
  }
  return { changeStatus };
}
