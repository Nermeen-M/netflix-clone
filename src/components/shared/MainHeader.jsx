import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

export default function MainHeader({ searchValue, setSearchValue }) {
  function changeHandler(event) {
    setSearchValue(event.target.value);
  }

  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="Netflix logo" width="100" />
      </Link>
      <div className="search">
        <input
          className="search-input"
          type="text"
          placeholder="Titles"
          value={searchValue}
          onChange={changeHandler}
        ></input>
      </div>
    </header>
  );
}
