import { useModal } from "../state/ModalContext";
import TitlePreview from "./TitlePreview";

export default function TitleCard({ item, index, isTopTen }) {
  const { setModal } = useModal();

  return (
    <div
      className="title"
      onClick={() => setModal(<TitlePreview item={item} />)}
    >
      {isTopTen && (
        <img
          className="rank"
          src={require(`../assets/images/numbers/${index + 1}.png`)}
        />
      )}
      <img className="thumbnail" src={item.thumbnail} />
    </div>
  );
}
