import { useState, useEffect } from "react";

export default function SeasonSelect({ episodes, setSeasonEpisodes }) {
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    getSeasons(episodes);
  }, []);

  async function getSeasons(episodes) {
    const seasons = await episodes.map((item) => item.season);
    const uniqueSeasons = await seasons.filter(
      (value, index, self) => self.indexOf(value) === index
    );
    setSeasons(uniqueSeasons);
  }
  console.log("selected season", selectedSeason);

  const selectOptions = seasons.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  function seasonChangeHandler(event) {
    setSelectedSeason(event.target.value);
    const filteredEpisodes = episodes.filter(
      (item) => item.season === event.target.value
    );
    console.log("filteredEpisodes", filteredEpisodes);
    setSeasonEpisodes(filteredEpisodes);
  }

  return (
    <label className="select">
      <select value={selectedSeason} onChange={seasonChangeHandler}>
        {selectOptions}
      </select>
    </label>
  );
}
