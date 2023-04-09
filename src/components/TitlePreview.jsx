import { useState } from "react";
import { Link } from "react-router-dom";

import { useModal } from "../state/ModalContext";
import Episodes from "./Episodes";

export default function TitlePreview({ item }) {
  const { setModal } = useModal();

  const [selectedEpisode, setSelectedEpisode] = useState("");
  const isSeries = item.type === "series" ? true : false;

  // const url = !isSeries
  //   ? `/watch/${item.type}/${item.id}`
  //   : `/watch/series/${item.id}/${selectedEpisode.season}/${selectedEpisode.id}`;
  const url = `/watch/${item.type}/${item.id}`;
  // function playHandler() {
  //   setModal(null);
  // }

  // console.log(selectedEpisode);
  return (
    <div className="title-preview">
      <div className="image-continer">
        <img src={item.background} width="300" />
        <div>
          {!isSeries && (
            <Link to={url} onClick={() => setModal(null)}>
              Play
            </Link>
          )}
        </div>
      </div>
      <div className="details">
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        {item.type === "series" && <Episodes titleId={item.id} />}
      </div>
    </div>
  );
}
