import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { readDocuments } from "../../scripts/firebase/fireStore";
import { useEpisodes } from "../../state/EpisodesContext";
import { useModal } from "../../state/ModalContext";
import data from "../../data/episodeData.json";
import fields from "../../data/episodeFields.json";
import SeasonSelect from "../../components/SeasonSelect";
import AdminEpisodeItem from "../../components/admin/AdminEpisodeItem";
import AddItemForm from "../../components/form/AddItemForm";
import LoadingScreen from "../../components/shared/LoadingScreen";
import EmptyState from "../../components/admin/EmptyState";
import AdminHeader from "../../components/admin/AdminHeader";

export default function ManageEpisodes() {
  const { titleId } = useParams();
  const { setModal } = useModal();
  const { episodes, dispatch } = useEpisodes();

  const [status, setStatus] = useState("loading");
  //   const [seasonEpisodes, setSeasonEpisodes] = useState([]);

  const path = `titles/${titleId}/episodes`;

  useEffect(() => {
    loadData(path);
  }, [episodes]);

  async function loadData(path) {
    const result = await readDocuments(path);
    result.status ? onSuccess(result.payload) : onFailure(result.message);
  }

  async function onSuccess(data) {
    await dispatch({ type: "initializeArray", payload: data });
    //refactor: add condition if null
    // const filteredEpisodes = data.filter((item) => item.season === 1);
    // setSeasonEpisodes(filteredEpisodes);
    setStatus("ready");
  }

  function onFailure(errorMessage) {
    alert(errorMessage);
    setStatus("error");
  }

  const episodesList = episodes.map((item) => (
    <AdminEpisodeItem key={item.id} item={item} path={path} />
  ));

  if (status === "loading") return <LoadingScreen />;
  if (status === "error") return <p>Error</p>;

  return (
    <>
      <AdminHeader />
      <div className="manage-episodes">
        <button
          className="primary-button"
          onClick={() =>
            setModal(<AddItemForm path={path} fields={fields} data={data} />)
          }
        >
          Add new episode
        </button>

        {episodesList.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="episodes-list">{episodesList}</div>
        )}
      </div>
    </>
  );
}
