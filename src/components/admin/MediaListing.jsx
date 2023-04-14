import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

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
    <div className="media-item" key={item.id}>
      <img src={item.thumbnail} />
      <h3>{item.name}</h3>
      <div className="buttons-group">
        <button
          onClick={() =>
            setModal(<UpdateItemForm path={path} fields={fields} data={item} />)
          }
        >
          <FontAwesomeIcon icon={solid("pen-to-square")} />
        </button>
        <button onClick={() => deleteHandler(item.id, item.name)}>
          <FontAwesomeIcon icon={solid("trash-can")} />
        </button>
        {item.type === "series" && (
          <Link to={`/${item.id}/episodes`}>
            <FontAwesomeIcon icon={solid("arrow-right")} />
          </Link>
        )}
      </div>
    </div>
  ));

  return <div className="media-list">{mediaList}</div>;
}
