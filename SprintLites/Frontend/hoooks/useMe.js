import { useEffect } from "react";
import { UseUser } from "../Context/userContext";
import { UseContextMe } from "../Context/MEContext";

export function UseMe(){
    let{user}=UseUser();
    let {Medispatch}=UseContextMe();
      useEffect(()=>{
        
       async function fetchMe(){
         try {
          const res= await fetch(`http://localhost:8080/api/auth/me`,{
            method: "GET",
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
          });
          const data=await res.json();
          if(res.ok){
            Medispatch({type:"fetchme",payload:data.user})
            
          }
          else{
            throw new Error(data.error);
          }
          
        } catch (error) {
          alert(error);
        }
       }
       fetchMe();
      },[])
}