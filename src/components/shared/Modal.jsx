import { createPortal } from "react-dom";

import { useModal } from "../../state/ModalContext";

export default function Modal() {
  const { modal, setModal } = useModal();

  const HTMLElement = document.getElementById("portal");

  if (modal === null) return null;

  return createPortal(
    <div id="modal">
      <div className="backdrop" onClick={() => setModal(null)}></div>
      <div className="window animate-fade-in">{modal}</div>
    </div>,
    HTMLElement
  );
}
