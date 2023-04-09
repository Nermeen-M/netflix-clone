import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import { readDocument } from "../../scripts/firebase/fireStore";

export default function Playback() {
  const { type, titleId, seasonNumber, episodeId } = useParams();

  const [status, setStatus] = useState("loading");

  const [currentItem, setCurrentItem] = useState({});

  //   const isSeries = {type === "series" ? true : false};

  const path = type === "series" ? `titles/${titleId}/episodes` : "titles";

  const id = type === "series" ? episodeId : titleId;

  useEffect(() => {
    loadData(path, id);
  }, []);

  async function loadData(path, id) {
    const result = await readDocument(path, id);
    result.status ? onSuccess(result.payload) : onFailure(result.message);
  }

  async function onSuccess(data) {
    setCurrentItem(data);
    setStatus("ready");
  }

  function onFailure(errorMessage) {
    alert(errorMessage);
    setStatus("error");
  }

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;

  return (
    <div>
      <ReactPlayer
        url={currentItem.url}
        width="100%"
        height="100%"
        controls={true}
      />
    </div>
  );
}
