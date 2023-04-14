import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../scripts/firebase/auth";
import { readDocument } from "../../scripts/firebase/fireStore";
import { useUser } from "../../state/UserContext";
import BasicHeader from "../../components/shared/BasicHeader";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, saveUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState(null);

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
    setMessage(`Cannot login, ${result.message}`);
  }

  async function getUserData(userId) {
    const collectionName = "users";
    const data = await readDocument(collectionName, userId);
    return data;
  }

  return (
    <div id="login">
      <BasicHeader pageName="login" />
      <div className="login-form">
        <h1>Sign In</h1>
        {message && <div className="message">{message}</div>}
        <div className="form-container">
          <form className="form" onSubmit={(event) => onSubmit(event)}>
            <div className="form-field">
              <input
                // placeholder="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <label>Email</label>
            </div>
            <div className="form-field">
              <input
                // placeholder="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <label>Password</label>
            </div>
            <button className="primary-button">Sign In</button>
            <div className="login-help">
              <div className="checkbox">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/recover-password">Need help?</Link>
            </div>
          </form>
          <div className="signup-now">
            New to Netflix?
            <Link to="/sign-up">Sign up now</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
