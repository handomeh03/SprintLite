import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../Context/userContext";

export function UseRegister(){
    let navigate=useNavigate();
    let {userDispatch}=UseUser();
    let [loading,setLoading]=useState(false);
    async function Register(name,email,password,role){
    try {
        setLoading(true);
      const res=await fetch("http://localhost:8080/api/auth/register",{
        method:"POST",
         headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({name,email,password,role})
      });
      const data=await res.json();
      if(res.ok){
         userDispatch({ type: "register", payload: data });
         sessionStorage.setItem("user",JSON.stringify(data));
         if(data.user.role=="member" || data.user.role=="manager"){
            navigate("/");
         }
        
      }
      else{
        alert(data.error);
      }
    } catch (error) {
      console.log(error)
    }finally{
        setLoading(false);
    }
  }
  return {Register,loading};
}