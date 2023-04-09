import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { readDocuments } from "../scripts/firebase/fireStore";
import { useEpisodes } from "../state/EpisodesContext";
import { useModal } from "../state/ModalContext";
import SeasonSelect from "./SeasonSelect";
import EpisodeItem from "./EpisodeItem";

export default function Episodes({ titleId }) {
  const { episodes, dispatch } = useEpisodes();
  const { setModal } = useModal();

  const [status, setStatus] = useState("loading");
  const [seasonEpisodes, setSeasonEpisodes] = useState([]);
  // const [selectedSeason, setSelectedSeason] = useState(1);

  const path = `titles/${titleId}/episodes`;

  useEffect(() => {
    loadData(path);
  }, []);

  // useEffect(() => {
  //   const filteredEpisodes = episodes.filter((item) => item.season === 1);
  //   console.log("filterd", filteredEpisodes);
  //   setSeasonEpisodes(filteredEpisodes);
  //   console.log("final", seasonEpisodes);
  // }, []);

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
    <EpisodeItem key={item.id} item={item} titleId={titleId} />
    // <Link
    //   key={item.id}
    //   to={`/watch/series/${titleId}/${item.season}/${item.id}`}
    //   onClick={() => setModal(null)}
    // >
    //   <h3>{item.title}</h3>
    //   <p>Season {item.season}</p>
    // </Link>
  ));

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;

  return (
    <div>
      <div>
        <h2>Episodes</h2>
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
