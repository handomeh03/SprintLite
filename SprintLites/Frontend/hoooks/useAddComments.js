import { UseCommnetContext } from "../Context/CommentsContext";
import { UseUser } from "../Context/userContext";

export function UseAddComment(){
    let {user}=UseUser();
    let{CommentDispatch}=UseCommnetContext();
    async function addComment(id,body) {
        try {
           const res = await fetch(
          `http://localhost:8080/api/issues/${id}/comment`,
          {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body:JSON.stringify({body})
          }
        );
        const data=await res.json();
        if(res.ok){
            CommentDispatch({type:"addcomment",payload:data.comment})
            
        }else{
          throw new Error(data.error);
        }
            
        } catch (error) {
            alert(error)
        }
    }
    return {addComment};
}