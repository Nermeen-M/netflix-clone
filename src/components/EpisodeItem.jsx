import { Link } from "react-router-dom";
import { useModal } from "../state/ModalContext";

export default function EpisodeItem({ item, titleId }) {
  const { setModal } = useModal();

  return (
    <Link
      key={item.id}
      to={`/watch/series/${titleId}/${item.season}/${item.id}`}
      onClick={() => setModal(null)}
    >
      <h3>{item.title}</h3>
      <p>Season {item.season}</p>
    </Link>
  );
}
