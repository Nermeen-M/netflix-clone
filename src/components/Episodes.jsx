import { useState, useEffect } from "react";

import SeasonSelect from "./SeasonSelect";
import EpisodeItem from "./EpisodeItem";
import { sortByEpisodeNumber } from "../scripts/helpers";
import LoadingScreen from "./shared/LoadingScreen";

export default function Episodes({ titleId, episodes, status }) {
  const [seasonEpisodes, setSeasonEpisodes] = useState([]);

  useEffect(() => {
    const filteredEpisodes = episodes.filter((item) => item.season == 1);
    const sortedEpisodes = sortByEpisodeNumber(filteredEpisodes);
    setSeasonEpisodes(sortedEpisodes);
  }, [episodes]);

  const episodesList = seasonEpisodes.map((item) => (
    <EpisodeItem key={item.id} item={item} titleId={titleId} />
  ));

  if (status === "loading") return <LoadingScreen />;
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

      <div className="episodes-list">{episodesList}</div>
    </div>
  );
}
