import { useEffect } from "react";
import { UseUser } from "../Context/userContext";
import { UsecontextIssues } from "../Context/IssuesContext";

export function UseIssues(status,assignee,sprint){
    let {user}=UseUser();
    let {IssuesDispatch}=UsecontextIssues();
      useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  async function fetchissue() {
    try {
      const res = await fetch(
        `http://localhost:8080/api/project/${JSON.parse(sessionStorage.getItem("projectId"))}/issuse/${JSON.parse(sessionStorage.getItem("sprintID"))}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          signal, 
        }
      );

      if (!res.ok) throw new Error("Failed to fetch issues");

      const data = await res.json();
      console.log(data);

      IssuesDispatch({ type: "fetchIssues", payload: data.issues });
      

    } catch (error) {
     console.log(error);
    }
  }

  fetchissue();

  return () => {
   
    controller.abort();
  };
}, [status, assignee, sprint, user.token, IssuesDispatch]);

}