import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { readDocuments } from "../scripts/firebase/fireStore";
import { useEpisodes } from "../state/EpisodesContext";
import { useModal } from "../state/ModalContext";

export default function Episodes({ titleId }) {
  // const navigate = useNavigate();
  const { episodes, dispatch } = useEpisodes();
  const { setModal } = useModal();

  const [status, setStatus] = useState("loading");
  const [selectedOption, setSelectedOption] = useState(1);
  const [seasonEpisodes, setSeasonEpisodes] = useState();
  const [seasons, setSeasons] = useState([]);

  const path = `titles/${titleId}/episodes`;

  useEffect(() => {
    loadData(path);
  }, []);

  useEffect(() => {
    getSeasons(episodes);
  }, [episodes]);

  async function loadData(path) {
    const result = await readDocuments(path);
    result.status ? onSuccess(result.payload) : onFailure(result.message);
  }

  async function onSuccess(data) {
    await dispatch({ type: "initializeArray", payload: data });
    // setEpisodes(data);
    setStatus("ready");
  }

  function onFailure(errorMessage) {
    alert(errorMessage);
    setStatus("error");
  }

  function getSeasons(episodes) {
    const seasons = episodes.map((item) => item.season);
    const uniqueSeasons = seasons.filter(
      (value, index, self) => self.indexOf(value) === index
    );
    setSeasons(uniqueSeasons);
  }
  const selectOptions = seasons.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));
  // function clickHandler(item) {
  //   const url = `/watch/series/${titleId}/${item.season}/${item.id}`;
  //   // setSelectedEpisode(item);
  //   navigate(url);
  // }

  const episodesList = episodes.map((item) => (
    <Link
      key={item.id}
      to={`/watch/series/${titleId}/${item.season}/${item.id}`}
      onClick={() => setModal(null)}
    >
      <h3>{item.title}</h3>
      <p>Season {item.season}</p>
    </Link>
  ));

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;

  return (
    <div>
      <div>
        <h2>Episodes</h2>
        <label className="select">
          <select
            value={selectedOption}
            onChange={(event) => setSelectedOption(event.target.value)}
          >
            {selectOptions}
          </select>
        </label>{" "}
      </div>

      {episodesList.length !== 0 ? (
        <div className="episodes-list">{episodesList}</div>
      ) : (
        <p>Content is coming soon.</p>
      )}
    </div>
  );
}
