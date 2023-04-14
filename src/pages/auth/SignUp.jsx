import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createAccount } from "../../scripts/firebase/auth";
import { createDocumentWithManualId } from "../../scripts/firebase/fireStore";
import BasicHeader from "../../components/shared/BasicHeader";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const collectionName = "users";

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const result = await createAccount(email, password);

    result.status ? onSucess(result) : onFailure(result);
  }

  async function onSucess(result) {
    const userData = { uid: result.payload, role: "customer" };
    await createDocumentWithManualId(collectionName, result.payload, userData);
    setIsLoading(false);
    navigate("/login");
  }

  function onFailure(result) {
    setIsLoading(false);
    alert(`Cannot create an account, ${result.message}`);
  }

  return (
    <div id="signup">
      <BasicHeader pageName="signup" />
      <div className="signup-form">
        <div className="container">
          <h1>Joining Netflix is easy.</h1>
          <p>
            Enter your email and password, and you'll be watching in no time.
          </p>
          <div className="form-container">
            <form onSubmit={(event) => onSubmit(event)}>
              <div className="form-field">
                <input
                  placeholder="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <label>Email </label>
              </div>
              <div className="form-field">
                <input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <label>Password</label>
              </div>
              <Link className="general-link" to="/recover-password">
                Forgot your password?
              </Link>
              <button className="primary-button">Next</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
