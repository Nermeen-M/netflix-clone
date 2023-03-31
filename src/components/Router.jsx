import React from "react";

import UnloggedRoutes from "../routes/UnloggedRoutes";
import AdminRoutes from "../routes/AdminRoutes";
import SubscriberRoutes from "../routes/SubscriberRoutes";
import { useUser } from "../state/UserContext";

export default function Router() {
  const { user } = useUser();
  const isAdmin = user.role == "admin";

  return (
    <>
      {!user.id && <UnloggedRoutes />}
      {user.id && (
        <div className="main-content">
          {isAdmin && <AdminRoutes />}
          {!isAdmin && <SubscriberRoutes />}
        </div>
      )}
    </>
  );
}
