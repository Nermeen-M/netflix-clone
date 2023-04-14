import { useModal } from "../state/ModalContext";
import TitlePreview from "./TitlePreview";

export default function TitleCard({ item, index, isTopTen }) {
  const { setModal } = useModal();

  return (
    <div
      className="title"
      onClick={() => setModal(<TitlePreview item={item} />)}
    >
      {isTopTen && <h2>{index + 1}</h2>}
      <img src={item.thumbnail} />
    </div>
  );
}
