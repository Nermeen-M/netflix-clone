import { useState, useEffect } from "react";

import { readDocuments } from "../../scripts/firebase/fireStore";
import { useItems } from "../../state/ItemsContext";
import { getRandomItem } from "../../scripts/helpers";

import MainHeader from "../../components/shared/MainHeader";
import MediaCarousel from "../../components/MediaCarousel";
import MediaHeading from "../../components/shared/MediaHeading";
import Hero from "../../components/Hero";
import TopTen from "../../components/TopTen";
import SearchResults from "../../components/SearchResults";
import LoadingScreen from "../../components/shared/LoadingScreen";

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
    return items.filter((item) => item.type === type);
  };

  const movies = filterItemsByType("movie");
  const series = filterItemsByType("series");
  const documentaries = filterItemsByType("documentary");
  const heroTitle = getRandomItem(movies);

  if (status === "loading") return <LoadingScreen />;
  if (status === "error") return <p>Error</p>;

  return (
    <div id="home">
      <MainHeader searchValue={searchValue} setSearchValue={setSearchValue} />
      {!searchValue ? (
        <>
          <Hero heroTitle={heroTitle} />
          <div className="media">
            {movies.length !== 0 && (
              <>
                <MediaHeading label="Movies" />
                <MediaCarousel items={movies} />
              </>
            )}

            {series.length !== 0 && (
              <>
                <MediaHeading label="Series" />
                <MediaCarousel items={series} />
              </>
            )}

            {documentaries.length !== 0 && (
              <>
                <MediaHeading label="Documentaries" />
                <MediaCarousel items={documentaries} />
              </>
            )}
          </div>
          <TopTen />
        </>
      ) : (
        <SearchResults searchValue={searchValue} />
      )}
    </div>
  );
}
