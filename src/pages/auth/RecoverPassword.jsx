import { useState } from "react";
import { Link } from "react-router-dom";

import { recoverAccount } from "../../scripts/firebase/auth";
// import recoverPasswordImage from "../../assets/images/recover-password.png";
// import logo from "../../assets/images/logo.png";

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
    <div className="form auth-form">
      <div className="container">
        {/* <Link to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link> */}

        <h1>
          If you forgot your password, enter the email used to create the
          account.
        </h1>
        {/* <img
          className="image"
          src={recoverPasswordImage}
          alt="Recover password"
        /> */}
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

            <button className="primary-button">Recover account</button>
          </form>
          <Link className="general-link" to="/login">
            Go back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
