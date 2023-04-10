import { Routes, Route } from "react-router-dom";

import AdminHome from "../pages/admin/AdminHome";
import ManageEpisodes from "../pages/admin/ManageEpisodes";
import NotFound from "../pages/shared/NotFound";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/:titleId/episodes" element={<ManageEpisodes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
