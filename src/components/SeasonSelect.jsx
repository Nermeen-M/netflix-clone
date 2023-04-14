import { useState, useEffect } from "react";

import { sortNumbers, sortByEpisodeNumber } from "../scripts/helpers";

export default function SeasonSelect({ episodes, setSeasonEpisodes }) {
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    getSeasons(episodes);
  }, [episodes]);

  async function getSeasons(episodes) {
    const seasons = await episodes.map((item) => item.season);
    const uniqueSeasons = await seasons.filter(
      (value, index, self) => self.indexOf(value) === index
    );
    setSeasons(uniqueSeasons);
  }

  const sortedSeasons = sortNumbers(seasons);

  const selectOptions = sortedSeasons.map((item) => (
    <option key={item} value={item}>
      Season {item}
    </option>
  ));

  function seasonChangeHandler(event) {
    setSelectedSeason(event.target.value);
    const filteredEpisodes = episodes.filter(
      (item) => item.season == event.target.value
    );
    const sortedEpisodes = sortByEpisodeNumber(filteredEpisodes);
    setSeasonEpisodes(sortedEpisodes);
  }

  return (
    <label className="season-select">
      <select value={selectedSeason} onChange={seasonChangeHandler}>
        {selectOptions}
      </select>
    </label>
  );
}
