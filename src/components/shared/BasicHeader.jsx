import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

export default function BasicHeader({ pageName }) {
  return (
    <header className="basic-header">
      <Link to="/" className="logo">
        <img src={logo} alt="Netflix logo" />
      </Link>
    </header>
  );
}
