import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../../state/UserContext";
import Search from "../Search";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profile.png";

export default function MainHeader({ searchValue, setSearchValue }) {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [isTransparent, setIsTransparent] = useState(true);

  function changeColor() {
    if (window.scrollY >= 40) setIsTransparent(false);
    else setIsTransparent(true);
  }

  window.addEventListener("scroll", changeColor);

  async function LogoutHandler() {
    localStorage.removeItem("user-data");
    await setUser("");
    navigate("/");
  }

  return (
    <header
      className={
        !isTransparent ? "main-header black-background" : "main-header"
      }
    >
      <Link to="/" className="logo">
        <img src={logo} alt="Netflix logo" width="100" />
      </Link>
      <div className="secondary-nav">
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="user-menu">
          <img src={profile} alt="profile picture" />
          <ul>
            <li>
              <Link onClick={() => LogoutHandler()}>Sign out of Netflix</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
