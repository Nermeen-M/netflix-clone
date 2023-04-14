import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { useModal } from "../state/ModalContext";
import { updateDocument } from "../scripts/firebase/fireStore";
import Episodes from "./Episodes";

export default function TitlePreview({ item }) {
  const { setModal } = useModal();
  const navigate = useNavigate();

  const [firstEpisode, setFirstEpisode] = useState("");

  const isSeries = item.type === "series" ? true : false;

  const url = `/watch/${item.type}/${item.id}`;

  async function clickHandler() {
    const updatedViews = item.views + 1;
    const updatedTitle = { ...item, views: updatedViews };

    await updateDocument("titles", item.id, updatedTitle);

    setModal(null);
    navigate(url);
  }

  return (
    <div className="title-preview">
      <button onClick={() => setModal(null)} className="close-button">
        <FontAwesomeIcon icon={solid("xmark")} />
      </button>
      <div className="image-container">
        <img className="background" src={item.background} width="300" />
        <div className="overlay">
          <div className="info">
            <h1>{item.name}</h1>
            <button className="button play-button" onClick={clickHandler}>
              <FontAwesomeIcon icon={solid("play")} />
              Play
            </button>
          </div>
        </div>
      </div>

      <div className="details">
        <div className="description">
          <p>{item.description}</p>
        </div>

        {item.type === "series" && (
          <Episodes titleId={item.id} setFirstEpisode={setFirstEpisode} />
        )}
      </div>
    </div>
  );
}
