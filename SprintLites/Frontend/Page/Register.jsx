import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../Css/Register.module.css";
import { UseRegister } from "../hoooks/useRegister";
import { UseUser } from "../Context/userContext";

export default function Register() {
  let{user}=UseUser();
  let navigate=useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member"); 
  let {Register}=UseRegister();


  function handleRegister(e){
      e.preventDefault();
     Register(name,email,password,role);
  }

  useEffect(() => {
      if (user) {
        navigate("/", { replace: true });
      }
    }, [user, navigate]);
  
  return (
    <div className={style.Register}>
      <form className={style.RegisterForm} >
        <h2 className={style.Title}>Sign Up</h2>

        <div className={style.InputGroup}>
          <label htmlFor="name"> Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className={style.InputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className={style.InputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        
        <div className={style.InputGroup}>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="member">Member</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <button onClick={handleRegister} type="submit" className={style.SubmitBtn}>
          Sign Up
        </button>

        <p className={style.LoginText}>
         do you have an account?{" "}
          <Link to="/login" className={style.LoginLink}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
