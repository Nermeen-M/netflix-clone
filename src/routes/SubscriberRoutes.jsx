import { Routes, Route } from "react-router-dom";

import Home from "../pages/subscriber/Home";
import NotFound from "../pages/shared/NotFound";

export default function SubscriberRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
