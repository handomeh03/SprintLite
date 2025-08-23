import { useEffect, useState } from "react";
import style from "../Css/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UseLogin } from "../hoooks/useLogin";
import { UseUser } from "../Context/userContext";

export default function Login() {
  let { user } = UseUser();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let { login } = UseLogin();

  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
  }
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className={style.Login}>
      <form className={style.LoginForm}>
        <h2 className={style.Title}>Login</h2>

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

        <button onClick={handleLogin} type="submit" className={style.SubmitBtn}>
          Login
        </button>
        <p className={style.SignUpText}>
          dont have an account{" "}
          <Link to="/signup" className={style.SignUpLink}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
