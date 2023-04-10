import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDocuments } from "../../scripts/firebase/fireStore";
import { useEpisodes } from "../../state/EpisodesContext";
import SeasonSelect from "../../components/SeasonSelect";

export default function ManageEpisodes() {
  const { titleId } = useParams();
  const { episodes, dispatch } = useEpisodes();

  const [status, setStatus] = useState("loading");
  const [seasonEpisodes, setSeasonEpisodes] = useState([]);

  const path = `titles/${titleId}/episodes`;

  useEffect(() => {
    loadData(path);
  }, []);

  async function loadData(path) {
    const result = await readDocuments(path);
    result.status ? onSuccess(result.payload) : onFailure(result.message);
  }

  async function onSuccess(data) {
    await dispatch({ type: "initializeArray", payload: data });
    //refactor: add condition if null
    const filteredEpisodes = data.filter((item) => item.season === 1);
    setSeasonEpisodes(filteredEpisodes);
    setStatus("ready");
  }

  function onFailure(errorMessage) {
    alert(errorMessage);
    setStatus("error");
  }

  const episodesList = seasonEpisodes.map((item) => (
    <div key={item.id} item={item}>
      <img src={item.thumbnail} width="150" />
      <h3>{item.title}</h3>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  ));

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;

  return (
    <div>
      <button>Add new episode</button>
      <SeasonSelect episodes={episodes} setSeasonEpisodes={setSeasonEpisodes} />
      {episodesList}
    </div>
  );
}
