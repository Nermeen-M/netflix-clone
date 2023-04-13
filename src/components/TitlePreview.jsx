import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useModal } from "../state/ModalContext";
import { updateDocument } from "../scripts/firebase/fireStore";
import Episodes from "./Episodes";

export default function TitlePreview({ item }) {
  const { setModal } = useModal();
  const navigate = useNavigate();

  const [selectedEpisode, setSelectedEpisode] = useState("");
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
      <div className="image-continer">
        <img src={item.background} width="300" />
        <div>{!isSeries && <button onClick={clickHandler}>Play</button>}</div>
      </div>
      <div className="details">
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        {item.type === "series" && <Episodes titleId={item.id} />}
      </div>
    </div>
  );
}
