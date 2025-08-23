import { useEffect } from "react";
import { UseUser } from "../Context/userContext";
import { UseCommnetContext } from "../Context/CommentsContext";

export function UseFetchComment(id,flag) {
    let {user}=UseUser();
    let {CommentDispatch}=UseCommnetContext();
  useEffect(() => {
    async function fetchComment() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/issues/${id}/comment`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data=await res.json();
        if(res.ok){
            CommentDispatch({type:"fetchComment",payload:data.comments})
            
        }
        else{
            throw new Error(data.error);
        }
      } catch (error) {
        alert(error);
      }
    }
    fetchComment();
  }, [id,flag]);
}
