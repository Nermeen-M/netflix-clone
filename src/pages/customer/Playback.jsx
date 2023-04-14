import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { readDocument } from "../../scripts/firebase/fireStore";
import LoadingScreen from "../../components/shared/LoadingScreen";

export default function Playback() {
  const { type, titleId, seasonNumber, episodeId } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");

  const [currentItem, setCurrentItem] = useState({});

  const isSeries = type === "series";

  const path = isSeries ? `titles/${titleId}/episodes` : "titles";

  const id = isSeries ? episodeId : titleId;

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

  if (status === "loading") return <LoadingScreen />;
  if (status === "error") return <p>Error</p>;

  return (
    <div className="playback">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={solid("arrow-left-long")} />
      </button>
      <ReactPlayer
        url={currentItem.url}
        width="100%"
        height="100%"
        controls={true}
      />
    </div>
  );
}
