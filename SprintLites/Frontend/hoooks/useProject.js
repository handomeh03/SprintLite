import { useEffect } from "react";
import { UseUser } from "../Context/userContext";
import { UseContextProject } from "../Context/ProjectsContext";

export function UseProject() {
  let { user } = UseUser(); 
  let {ProjectDispatch}=UseContextProject(); 
  

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch("http://localhost:8080/api/project/listProject", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          ProjectDispatch({type:"fetchProject",payload:data.projects})
          
        } else {
        throw new Error(data.error);
        }
      } catch (error) {
       console.log(error);
      }
    }

    fetchProject();
  }, [user]);

}
