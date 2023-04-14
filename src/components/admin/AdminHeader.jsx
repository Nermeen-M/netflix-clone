import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../../state/UserContext";

export default function AdminHeader() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  async function LogoutHandler() {
    localStorage.removeItem("user-data");
    await setUser("");
    navigate("/");
  }

  return (
    <header className="admin-header">
      <Link onClick={() => LogoutHandler()}>Sign out of Netflix</Link>
    </header>
  );
}
