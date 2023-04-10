import { useState, useEffect } from "react";

import { readDocuments } from "../../scripts/firebase/fireStore";
import { useItems } from "../../state/ItemsContext";
import MainHeader from "../../components/shared/MainHeader";
import MediaCarousel from "../../components/MediaCarousel";
import HeadingExpand from "../../components/shared/HeadingExpand";

export default function Home() {
  const { items, dispatch } = useItems();
  const [status, setStatus] = useState("loading");
  const [searchValue, setSearchValue] = useState("");

  const path = "titles";

  useEffect(() => {
    loadData(path);
  }, []);

  async function loadData(path) {
    const result = await readDocuments(path);
    result.status ? onSuccess(result.payload) : onFailure(result.message);
  }

  async function onSuccess(data) {
    await dispatch({ type: "initializeArray", payload: data });
    setStatus("ready");
  }

  function onFailure(errorMessage) {
    alert(errorMessage);
    setStatus("error");
  }

  const filterItemsByType = (type) => {
    return items.filter(
      (item) =>
        item.type === type &&
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const movies = filterItemsByType("movie");
  const series = filterItemsByType("series");
  const documentaries = filterItemsByType("documentary");

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;

  return (
    <div id="home">
      <MainHeader searchValue={searchValue} setSearchValue={setSearchValue} />

      <div className="media">
        {movies.length !== 0 && (
          <div>
            <HeadingExpand label="Movies" />
            <MediaCarousel items={movies} />
          </div>
        )}

        {series.length !== 0 && (
          <div>
            <HeadingExpand label="Series" />
            <MediaCarousel items={series} />
          </div>
        )}

        {documentaries.length !== 0 && (
          <div>
            <HeadingExpand label="Documentaries" />
            <MediaCarousel items={documentaries} />
          </div>
        )}
      </div>

      {searchValue &&
        movies.length == 0 &&
        series.length == 0 &&
        documentaries.length == 0 && (
          <p>Your search for "{searchValue}" did not have any matches. </p>
        )}
    </div>
  );
}
