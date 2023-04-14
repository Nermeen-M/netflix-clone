import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { useModal } from "../state/ModalContext";
import { useItems } from "../state/ItemsContext";
import { updateDocument } from "../scripts/firebase/fireStore";

export default function EpisodeItem({ item, titleId }) {
  const { setModal } = useModal();
  const { items } = useItems();
  const navigate = useNavigate();

  const { number, thumbnail, title, description } = item;
  const url = `/watch/series/${titleId}/${item.season}/${item.id}`;
  const currentTitle = items.find((item) => item.id === titleId);

  async function clickHandler() {
    const updatedViews = currentTitle.views + 1;
    const updatedTitle = { ...currentTitle, views: updatedViews };

    await updateDocument("titles", titleId, updatedTitle);

    setModal(null);
    navigate(url);
  }

  return (
    <div className="episode-item" onClick={clickHandler}>
      <span className="number">{number}</span>
      <div className="image">
        <img src={thumbnail} />
        <button className="play-episode">
          <FontAwesomeIcon icon={solid("play")} />
        </button>
      </div>
      <div className="content">
        <span className="episode-title">{title}</span>
        <p className="episode-description">{description}</p>
      </div>
    </div>
  );
}
