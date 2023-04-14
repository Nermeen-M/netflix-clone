import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { readDocuments } from "../scripts/firebase/fireStore";
import { useEpisodes } from "../state/EpisodesContext";
import { useModal } from "../state/ModalContext";
import SeasonSelect from "./SeasonSelect";
import EpisodeItem from "./EpisodeItem";
import { sortByEpisodeNumber } from "../scripts/helpers";

export default function Episodes({ titleId, setFirstEpisode }) {
  const { episodes, dispatch } = useEpisodes();
  const { setModal } = useModal();

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

  const sortedEpisodes = sortByEpisodeNumber(seasonEpisodes);

  // const firstEpisode = sortedEpisodes.splice(0, 1);
  // setFirstEpisode(firstEpisode);

  const episodesList = sortedEpisodes.map((item) => (
    <EpisodeItem key={item.id} item={item} titleId={titleId} />
  ));

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;

  return (
    <div className="episodes">
      <div className="episodes-header">
        <h3>Episodes</h3>
        <SeasonSelect
          episodes={episodes}
          setSeasonEpisodes={setSeasonEpisodes}
        />
      </div>

      {episodesList.length !== 0 ? (
        <div className="episodes-list">{episodesList}</div>
      ) : (
        <p>Content is coming soon.</p>
      )}
    </div>
  );
}
