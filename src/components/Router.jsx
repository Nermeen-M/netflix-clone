import React from "react";

import UnloggedRoutes from "../routes/UnloggedRoutes";
import AdminRoutes from "../routes/AdminRoutes";
import CustomerRoutes from "../routes/CustomerRoutes";
import { useUser } from "../state/UserContext";

export default function Router() {
  const { user } = useUser();
  const isAdmin = user.role == "admin";

  // small refactor
  return (
    <>
      {!user.id && <UnloggedRoutes />}
      {user.id && isAdmin && <AdminRoutes />}
      {user.id && !isAdmin && <CustomerRoutes />}
    </>
  );
}
