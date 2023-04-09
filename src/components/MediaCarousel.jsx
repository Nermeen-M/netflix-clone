import { useModal } from "../state/ModalContext";
import TitlePreview from "./TitlePreview";

export default function MediaCarousel({ items }) {
  const { setModal } = useModal();

  const carousel = items.map((item) => (
    <div key={item.id} onClick={() => setModal(<TitlePreview item={item} />)}>
      <img src={item.thumbnail}></img>
    </div>
  ));

  return <div>{carousel}</div>;
}
