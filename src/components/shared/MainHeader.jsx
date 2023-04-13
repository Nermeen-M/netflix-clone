import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search";

import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profile.png";

export default function MainHeader({ searchValue, setSearchValue }) {
  const [isTransparent, setIsTransparent] = useState(true);

  function changeColor() {
    if (window.scrollY >= 40) setIsTransparent(false);
    else setIsTransparent(true);
  }

  window.addEventListener("scroll", changeColor);

  return (
    <header
      className={
        !isTransparent ? "main-header black-background" : "main-header"
      }
    >
      <Link to="/" className="logo">
        <img src={logo} alt="Netflix logo" width="100" />
      </Link>
      {/* <div className="primary-nav">
        <Link to="/">Movies</Link>
        <Link to="/">Series</Link>
        <Link to="/">Documentaries</Link>
      </div> */}
      <div className="secondary-nav">
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <img src={profile} alt="profile picture" />
      </div>
    </header>
  );
}
