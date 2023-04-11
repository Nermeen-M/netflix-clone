import { Link } from "react-router-dom";
import { useModal } from "../../state/ModalContext";
import UpdateItemForm from "../form/UpdateItemForm";
import fields from "../../data/titleFields.json";

export default function MediaListing({ items }) {
  const { setModal } = useModal();
  const path = "titles";

  const mediaList = items.map((item) => (
    <div key={item.id}>
      <img src={item.thumbnail} width="150" />
      <h3>{item.name}</h3>
      <button
        onClick={() =>
          setModal(<UpdateItemForm path={path} fields={fields} data={item} />)
        }
      >
        Edit
      </button>
      <button>Delete</button>
      {item.type === "series" && (
        <Link to={`/${item.id}/episodes`}>View episodes</Link>
      )}
    </div>
  ));

  return <div>{mediaList}</div>;
}
