import { Routes, Route } from "react-router-dom";

import Home from "../pages/customer/Home";
import NotFound from "../pages/shared/NotFound";

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
