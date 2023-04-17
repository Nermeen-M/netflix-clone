import { Routes, Route } from "react-router-dom";

import Home from "../pages/customer/Home";
import Playback from "../pages/customer/Playback";
import NotFound from "../pages/shared/NotFound";

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* To avoid this issue, every media type (movie, doc) and episode of a serie just have a videoId and sent that to the video page */}
      <Route path="/watch/:type/:titleId" element={<Playback />} />
      <Route
        path="/watch/:type/:titleId/:seasonNumber/:episodeId"
        element={<Playback />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
