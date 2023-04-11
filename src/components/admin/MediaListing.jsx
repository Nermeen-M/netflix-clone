import { Link } from "react-router-dom";
import { useModal } from "../../state/ModalContext";
import UpdateItemForm from "../form/UpdateItemForm";
import fields from "../../data/titleFields.json";
import { useItems } from "../../state/ItemsContext";
import { deleteDocument } from "../../scripts/firebase/fireStore";

export default function MediaListing({ items }) {
  const { setModal } = useModal();
  const { dispatch } = useItems();
  const path = "titles";

  async function deleteHandler(id, name) {
    const message = `Are you sure you want to delete ${name}`;
    const result = window.confirm(message);

    if (!result) return;

    await deleteDocument(path, id);
    dispatch({ type: "deleteItem", payload: id });
  }

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
      <button onClick={() => deleteHandler(item.id, item.name)}>Delete</button>
      {item.type === "series" && (
        <Link to={`/${item.id}/episodes`}>View episodes</Link>
      )}
    </div>
  ));

  return <div>{mediaList}</div>;
}
