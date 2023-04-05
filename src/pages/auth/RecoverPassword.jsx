import { useState } from "react";
import { Link } from "react-router-dom";

import { recoverAccount } from "../../scripts/firebase/auth";
// import recoverPasswordImage from "../../assets/images/recover-password.png";
// import logo from "../../assets/images/logo.png";
import BasicHeader from "../../components/shared/BasicHeader";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    const result = await recoverAccount(email);

    result.status ? onSucess() : onFailure(result);
  }

  function onSucess() {
    const text =
      "Email with a reset link sent. Please check your SPAM/Junk folder as well.";
    alert(text);
  }

  function onFailure(result) {
    alert(result.message);
  }

  return (
    <div id="recover-password">
      <BasicHeader pageName="recover-password" />
      <div className="recover-password-form">
        <div className="container">
          <h1>Forgot Email/Password</h1>
          <p>
            We will send you an email with instructions on how to reset your
            password.
          </p>

          <div className="form-container">
            <form onSubmit={(event) => onSubmit(event)}>
              <div className="form-field">
                <input
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <button className="primary-button">Email Me</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
