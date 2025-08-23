import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../Context/userContext";

export function UseLogin() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let { userDispatch } = UseUser();
  async function login(email, password) {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        userDispatch({ type: "login", payload: data });
        sessionStorage.setItem("user",JSON.stringify(data));
        if (data.user.role == "member" || data.user.role == "manager" ) {
          navigate("/");
        }
        
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  return { login, loading };
}
