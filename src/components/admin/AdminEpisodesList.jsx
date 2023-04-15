import { useState, useEffect } from "react";

import { sortByEpisodeNumber } from "../../scripts/helpers";
import AdminEpisodeItem from "./AdminEpisodeItem";
import EmptyState from "./EmptyState";

export default function AdminEpisodesList({ episodes, path }) {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    getSeasons(episodes);
  }, [episodes]);

  async function getSeasons(episodes) {
    const seasons = await episodes.map((item) => Number(item.season));
    const uniqueSeasons = await seasons.filter(
      (value, index, self) => self.indexOf(value) === index
    );
    setSeasons(uniqueSeasons);
  }

  const list = seasons.map((seasonItem) => (
    <div key={seasonItem}>
      <h2>Season {seasonItem}</h2>
      <div className="episodes-list">
        {sortByEpisodeNumber(episodes)
          .filter((episodeItem) => episodeItem.season == seasonItem)
          .map((episodeItem) => (
            <AdminEpisodeItem
              key={episodeItem.id}
              item={episodeItem}
              path={path}
            />
          ))}
      </div>
    </div>
  ));

  return <div>{list ? list : <EmptyState />}</div>;
}
