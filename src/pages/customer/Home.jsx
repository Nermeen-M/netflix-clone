import { useState, useEffect } from "react";

import { readDocuments } from "../../scripts/firebase/fireStore";
import { useItems } from "../../state/ItemsContext";
import MediaCarousel from "../../components/MediaCarousel";
import HeadingExpand from "../../components/shared/HeadingExpand";

export default function Home() {
  const { items, dispatch } = useItems();
  const [status, setStatus] = useState("loading");

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

  // console.log(series);

  // const media = items.map((item) => (
  //   <MediaCarousel key={item.id} item={item} />
  // ));

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;

  return (
    <div id="home">
      <HeadingExpand label="Movies" />
      <MediaCarousel items={movies} />

      <HeadingExpand label="Series" />
      <MediaCarousel items={series} />

      <HeadingExpand label="Documentaries" />
      <MediaCarousel items={documentaries} />
    </div>
  );
}
