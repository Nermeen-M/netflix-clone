import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

export default function MainHeader() {
  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="Netflix logo" />
      </Link>
    </header>
  );
}