import { useModal } from "../../state/ModalContext";
import UpdateItemForm from "../form/UpdateItemForm";
import fields from "../../data/episodeFields.json";
import { useEpisodes } from "../../state/EpisodesContext";
import { deleteDocument } from "../../scripts/firebase/fireStore";

export default function AdminEpisodeItem({ item, path }) {
  const { setModal } = useModal();
  const { dispatch } = useEpisodes();
  const { id, title, thumbnail } = item;

  async function deleteHandler(id) {
    const message = `Are you sure you want to delete ${title}`;
    const result = window.confirm(message);

    if (!result) return;

    await deleteDocument(path, id);
    dispatch({ type: "deleteItem", payload: id });
  }

  return (
    <div>
      <img src={thumbnail} width="150" />
      <h3>{title}</h3>
      <button
        onClick={() =>
          setModal(<UpdateItemForm path={path} fields={fields} data={item} />)
        }
      >
        Edit
      </button>
      <button onClick={() => deleteHandler(id)}>Delete</button>
    </div>
  );
}
