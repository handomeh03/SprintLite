import { UseContextProject } from "../Context/ProjectsContext";
import { UseUser } from "../Context/userContext";


export function UseAddUser(){
    let {user}=UseUser();
    let {ProjectDispatch}=UseContextProject();
    async function adduser(id,email) {
      try {
        const res=await fetch(`http://localhost:8080/api/project/${id}/members`,
          {
           method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body:JSON.stringify({email})
          }
        );
        const data=await res.json();
        if(res.ok){
            ProjectDispatch({type:"adduser",payload:data.project});
        }
        if(!res.ok){
          throw new Error(data.error);
        }
      } catch (error) {
        alert(error);
      }
    }
    return {adduser};
}