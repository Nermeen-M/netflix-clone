import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createAccount } from "../../scripts/firebase/auth";
import { createDocumentWithManualId } from "../../scripts/firebase/fireStore";
// import LoadingScreen from "../../components/shared/LoadingScreen";
// import signUpImage from "../../assets/images/sign-up.png";
// import logo from "../../assets/images/logo.png";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
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
    const userData = { uid: result.payload, name: name, role: "subscriber" };
    await createDocumentWithManualId(collectionName, result.payload, userData);
    setIsLoading(false);
    navigate("/login");
  }

  function onFailure(result) {
    setIsLoading(false);
    alert(`Cannot create an account, ${result.message}`);
  }

  return (
    <div className="form auth-form">
      {/* {isloading && <LoadingScreen />} */}
      <div className="container">
        {/* <Link to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link> */}

        <h1>Welcome to Bright Brain! Let’s begin the adventure</h1>
        {/* <img className="image" src={signUpImage} alt="Sign up" /> */}
        <div className="form-container">
          <form onSubmit={(event) => onSubmit(event)}>
            <label>
              Name
              <input
                placeholder="name"
                type="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
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

            <button className="primary-button">Create account</button>
          </form>
          <Link className="general-link" to="/login">
            Login instead
          </Link>
        </div>
      </div>
    </div>
  );
}
