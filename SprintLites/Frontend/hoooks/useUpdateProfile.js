import { useNavigate } from "react-router-dom";
import { UseContextMe } from "../Context/MEContext";
import { UseUser } from "../Context/userContext";

export function UseUpdateProfile(){
    let {user}=UseUser();
    let {Medispatch}=UseContextMe();
    let navigate=useNavigate();
      async function updateProfile(name,email,password) {

    try {
      const res = await fetch(`http://localhost:8080/api/users/${user.user.id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Medispatch({type:"updateme",payload:data.user});

        navigate("/")

      } else {
       throw new Error(data.error);
      }
    } catch (error) {
      alert(error);
    } 
  }
  return {updateProfile};
}