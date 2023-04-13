import Router from "./components/Router";
import Modal from "./components/shared/Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/styles/style.scss";

export default function App() {
  return (
    <div className="App">
      <Router />
      <Modal />
    </div>
  );
}
