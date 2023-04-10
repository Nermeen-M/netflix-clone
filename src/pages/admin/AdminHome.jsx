import { useState, useEffect } from "react";

import { useModal } from "../../state/ModalContext";
import { readDocuments } from "../../scripts/firebase/fireStore";
import { useItems } from "../../state/ItemsContext";
import MediaListing from "../../components/admin/MediaListing";
import EmptyState from "../../components/admin/EmptyState";

export default function AdminHome() {
  const { setModal } = useModal();
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

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;

  return (
    <div>
      <button>Add new title</button>
      <div className="media">
        {movies.length !== 0 && (
          <div>
            <h2>Movies</h2>
            <MediaListing items={movies} />
          </div>
        )}

        {series.length !== 0 && (
          <div>
            <h2>Series</h2>
            <MediaListing items={series} />
          </div>
        )}

        {documentaries.length !== 0 && (
          <div>
            <h2>Documentaries</h2>
            <MediaListing items={documentaries} />
          </div>
        )}
      </div>
    </div>
  );
}
