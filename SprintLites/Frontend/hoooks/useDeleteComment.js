import { UseCommnetContext } from "../Context/CommentsContext";
import { UseUser } from "../Context/userContext";

export function UseDeletecomment(){
    let {user}=UseUser();
    let{CommentDispatch}=UseCommnetContext();
    async function deleteComment(id) {
        try {
           const res = await fetch(
          `http://localhost:8080/api/issues/comment/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
            }
          }
        );
        const data=await res.json();
        if(res.ok){
            CommentDispatch({type:"deleteCommment",payload:id})
        }else{
          throw new Error(data.error);
        }
            
        } catch (error) {
            alert(error)
        }
    }
    return {deleteComment};
}