import { UsecontextIssues } from "../Context/IssuesContext";
import { UseUser } from "../Context/userContext";

export function UseCreateIssues(){
    let {user}=UseUser();
    let{IssuesDispatch}=UsecontextIssues();
async function addissues(title,description,assign,proirty,status,type) {
    try {
      const res = await fetch(`http://localhost:8080/api/project/${JSON.parse(sessionStorage.getItem("projectId"))}/issuse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body:JSON.stringify(
            {
                sprintId:JSON.parse(sessionStorage.getItem("sprintID")),
                type,
                title,
                description,
                assignee:assign,
                priority:proirty,
                status
            })
        });
        const data=await res.json();
        if(res.ok){
           IssuesDispatch({type:"addissues",payload:data.issue})
            
        }
        if(!res.ok){
            throw new Error(data.error);
        }
    } catch (error) {
      alert(error);
    }
  }
  return {addissues};
}