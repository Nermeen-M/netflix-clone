import { Routes, Route } from "react-router-dom";

import AdminHome from "../pages/admin/AdminHome";
import NotFound from "../pages/shared/NotFound";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
