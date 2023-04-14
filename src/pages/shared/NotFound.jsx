import { useNavigate } from "react-router";
import BasicHeader from "../../components/shared/BasicHeader";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <BasicHeader pageName="not-found" />

      <div className="text">
        <h1>Lost your way?</h1>
        <p>
          Sorry, we can't find that page. You'll find loads to explore on the
          home page.
        </p>
        <button className="white-button" onClick={() => navigate("/")}>
          Netflix Home
        </button>
      </div>
    </div>
  );
}
