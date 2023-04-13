import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { updateDocument } from "../scripts/firebase/fireStore";
import { readDocumentsWithCondition } from "../scripts/firebase/fireStore";
import { useModal } from "../state/ModalContext";
import { useItems } from "../state/ItemsContext";
import { getRandomItem } from "../scripts/helpers";
import TitlePreview from "./TitlePreview";

export default function Hero() {
  const { setModal } = useModal();
  const { items } = useItems();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");

  const [firstEpisode, setFirstEpisode] = useState();
  // const [heroTitle, setHeroTitle] = useState();

  //   useEffect(() => {
  //     const item = getRandomItem(items);
  //     setHeroTitle(item);
  //   }, []);
  const filteredItems = items.filter((item) => item.type === "movie");
  const heroTitle = getRandomItem(filteredItems);

  const url = `/watch/${heroTitle.type}/${heroTitle.id}`;

  async function clickHandler() {
    const updatedViews = heroTitle.views + 1;
    const updatedTitle = { ...heroTitle, views: updatedViews };

    await updateDocument("titles", heroTitle.id, updatedTitle);

    setModal(null);
    navigate(url);
  }

  return (
    <div id="hero">
      <div className="image-wrapper">
        <img src={heroTitle.background} height="500" />
      </div>
      <div className="details">
        <h1>{heroTitle.name}</h1>
        <p>{heroTitle.description}</p>
        <div className="buttons">
          <button onClick={clickHandler} className="button play-button">
            <FontAwesomeIcon icon={solid("play")} />
            Play
          </button>
          <button
            onClick={() => setModal(<TitlePreview item={heroTitle} />)}
            className="button secondary-button"
          >
            <FontAwesomeIcon icon={solid("circle-info")} />
            More info
          </button>
        </div>
      </div>
    </div>
  );
}
