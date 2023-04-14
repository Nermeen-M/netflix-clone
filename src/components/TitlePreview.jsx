import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { useModal } from "../state/ModalContext";
import { useEpisodes } from "../state/EpisodesContext";
import { readDocuments } from "../scripts/firebase/fireStore";
import { updateDocument } from "../scripts/firebase/fireStore";
import Episodes from "./Episodes";

export default function TitlePreview({ item }) {
  const { setModal } = useModal();
  const navigate = useNavigate();
  const { episodes, dispatch } = useEpisodes();

  const [status, setStatus] = useState("loading");
  const [url, setUrl] = useState("");
  const isSeries = item.type === "series";
  const path = `titles/${item.id}/episodes`;

  useEffect(() => {
    setUrl(`/watch/${item.type}/${item.id}`);
    {
      isSeries && loadData(path);
    }
  }, []);

  async function loadData(path) {
    const result = await readDocuments(path);
    result.status ? onSuccess(result.payload) : onFailure(result.message);
  }

  async function onSuccess(data) {
    await dispatch({ type: "initializeArray", payload: data });

    const firstEpisode = data.find(
      (item) => item.season === 1 && item.number === 1
    );
    setUrl(`/watch/series/${item.id}/1/${firstEpisode.id}`);
    setStatus("ready");
  }

  function onFailure(errorMessage) {
    alert(errorMessage);
    setStatus("error");
  }

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
        <img className="background" src={item.background} />
        <div className="overlay">
          <div className="info">
            <h1>{item.name}</h1>
            <button
              className="button play-button"
              disabled={isSeries && episodes.length === 0 && true}
              onClick={clickHandler}
            >
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

        {isSeries && episodes.length !== 0 ? (
          <Episodes titleId={item.id} episodes={episodes} status={status} />
        ) : (
          isSeries && episodes.length === 0 && <p>Content is coming soon.</p>
        )}
      </div>
    </div>
  );
}
