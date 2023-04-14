import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { useModal } from "../../state/ModalContext";
import UpdateItemForm from "../form/UpdateItemForm";
import fields from "../../data/episodeFields.json";
import { useEpisodes } from "../../state/EpisodesContext";
import { deleteDocument } from "../../scripts/firebase/fireStore";

export default function AdminEpisodeItem({ item, path }) {
  const { setModal } = useModal();
  const { dispatch } = useEpisodes();
  const { id, title, thumbnail, season, number } = item;

  async function deleteHandler(id) {
    const message = `Are you sure you want to delete ${title}`;
    const result = window.confirm(message);

    if (!result) return;

    await deleteDocument(path, id);
    dispatch({ type: "deleteItem", payload: id });
  }

  return (
    <div className="admin-episode-item">
      <img src={thumbnail} />
      <h3>{title}</h3>
      <span>Season {season}</span>
      <span>Episode {number}</span>
      <div className="buttons-group">
        <button
          onClick={() =>
            setModal(<UpdateItemForm path={path} fields={fields} data={item} />)
          }
        >
          <FontAwesomeIcon icon={solid("pen-to-square")} />
        </button>
        <button onClick={() => deleteHandler(id)}>
          <FontAwesomeIcon icon={solid("trash-can")} />
        </button>
      </div>
    </div>
  );
}
