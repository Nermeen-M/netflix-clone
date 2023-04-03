import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

export default function BasicHeader({ className }) {
  return (
    <header id="basic-header" className={className}>
      <Link to="/" className="logo">
        <img src={logo} alt="Netflix logo" />
      </Link>
    </header>
  );
}
