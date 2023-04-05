import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../scripts/firebase/auth";
import { readDocument } from "../../scripts/firebase/fireStore";
import { useUser } from "../../state/UserContext";
import BasicHeader from "../../components/shared/BasicHeader";
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
    <div id="login">
      <BasicHeader pageName="login" />
      <div className="login-form">
        <h1>Sign In</h1>
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
          <div className="recaptcha">
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.
              <a>Learn more.</a>
            </p>
            <p>
              The information collected by Google reCAPTCHA is subject to the
              Google Privacy Policy and Terms of Service, and is used for
              providing, maintaining and improving the reCAPTCHA service and for
              general security purposes (it is not used for personalised
              advertising by Google).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
