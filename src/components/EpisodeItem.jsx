import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../state/ModalContext";
import { useItems } from "../state/ItemsContext";
import { updateDocument } from "../scripts/firebase/fireStore";

export default function EpisodeItem({ item, titleId }) {
  const { setModal } = useModal();
  const { items } = useItems();
  const navigate = useNavigate();

  const url = `/watch/series/${titleId}/${item.season}/${item.id}`;
  const title = items.find((item) => item.id === titleId);

  async function clickHandler() {
    const updatedViews = title.views + 1;
    const updatedTitle = { ...title, views: updatedViews };

    await updateDocument("titles", titleId, updatedTitle);

    setModal(null);
    navigate(url);
  }

  return (
    <div onClick={clickHandler}>
      <h3>{item.title}</h3>
      <p>Season {item.season}</p>
    </div>
  );
}
