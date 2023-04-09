import { useState, useEffect } from "react";

export default function SeasonSelect({ episodes }) {
  const [seasons, setSeasons] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    getSeasons(episodes);
  }, []);

  // console.log("Seasons", seasons);

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
  return (
    <label className="select">
      <select
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
      >
        {selectOptions}
      </select>
    </label>
  );
}
