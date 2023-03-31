import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../scripts/firebase/auth";
import { readDocument } from "../../scripts/firebase/fireStore";
import { useUser } from "../../state/UserContext";
// import loginImage from "../../assets/images/login.png";
// import logo from "../../assets/images/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, saveUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const result = await login(email, password);
    result.status ? onSucess(result) : onFailure(result);
  }

  async function onSucess(result) {
    const userData = await getUserData(result.payload);

    setUser(userData.payload);
    if (remember) {
      await saveUser(userData.payload);
    }
    navigate("/");
  }

  function onFailure(result) {
    alert(`Cannot login, ${result.message}`);
  }

  async function getUserData(userId) {
    const collectionName = "users";
    const data = await readDocument(collectionName, userId);
    return data;
  }

  return (
    <div className="form auth-form">
      <div className="container">
        {/* <Link to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link> */}
        <h1>Login to Bright Brain</h1>
        {/* <img className="image" src={loginImage} alt="Login" /> */}
        <div className="form-container">
          <form onSubmit={(event) => onSubmit(event)}>
            <label>
              Email
              <input
                placeholder="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <div className="checkbox">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button className="primary-button">Login</button>
          </form>
          <Link className="general-link" to="/recover-password">
            Forgot password?
          </Link>
          <Link className="general-link" to="/sign-up">
            Create a new account
          </Link>
        </div>
      </div>
    </div>
  );
}
