import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// this part looks a bit messy, refactor it
export default function Search({ searchValue, setSearchValue }) {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setIsDisplayed(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function changeHandler(event) {
    setSearchValue(event.target.value);
  }

  return (
    <div className="search">
      {!isDisplayed && (
        <button className="toggle-button" onClick={() => setIsDisplayed(true)}>
          <FontAwesomeIcon icon={solid("magnifying-glass")} />
        </button>
      )}

      <div
        className={isDisplayed ? "search-box" : "search-box hidden"}
        ref={searchBoxRef}
      >
        <FontAwesomeIcon icon={solid("magnifying-glass")} />
        <input
          className="search-input"
          type="text"
          placeholder="Titles"
          value={searchValue}
          onChange={changeHandler}
        ></input>
        {searchValue && (
          <button onClick={() => setSearchValue("")}>
            <FontAwesomeIcon icon={solid("xmark")} />
          </button>
        )}
      </div>
    </div>
  );
}
