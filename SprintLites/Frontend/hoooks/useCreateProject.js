import { UseContextProject } from "../Context/ProjectsContext";
import { UseUser } from "../Context/userContext";

export function UseCreateProject(){
    let{user}=UseUser();
    let{ProjectDispatch}=UseContextProject();
    async function createProject(name,key,description,member) {
     try {
      const res=await fetch(`http://localhost:8080/api/project/createProject`,
        {
          method:"POST",
          body:JSON.stringify({name,key,description,membersEmail:[member]}),
          headers: {
             "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data=await res.json();
      if(!res.ok){
        throw new Error(data.error);
      }
      else{
        ProjectDispatch({type:"createproject",payload:data.project})
        
      }
      
     } catch (error) {
     alert(error)
     }
   }
   return {createProject};
}