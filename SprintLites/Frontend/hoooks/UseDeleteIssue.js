import { UsecontextIssues } from "../Context/IssuesContext";
import { UseUser } from "../Context/userContext";

export function UseDeleteIssue(){
    let {user}=UseUser();
    let {IssuesDispatch}=UsecontextIssues();
    async function deleteIsuues(id) {
    try {
       const res=await fetch(`http://localhost:8080/api/project/issues/${id}`,
        {
          method:"DELETE",
           headers: {
            Authorization: `Bearer ${user.token}`,
          }
        }

       );
       const data= await res.json();
       if(!res.ok){
        throw new Error(data.error);
       }
       if(res.ok){
        IssuesDispatch({type:"deleteIssues",payload:data.Issue});
        
       }
      
    } catch (error) {
      alert(error);
    }
  }
   return {deleteIsuues};
}