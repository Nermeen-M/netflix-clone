import { createPortal } from "react-dom";

import { useModal } from "../../state/ModalContext";

// good
export default function Modal() {
  const { modal, setModal } = useModal();

  let HTMLElement = document.getElementById("portal");
  if (!HTMLElement) {
    HTMLElement = document.createElement("div");
    HTMLElement.setAttribute("id", "HTMLElement");
    document.body.appendChild(HTMLElement);
  }

  if (modal === null) return null;

  return createPortal(
    <div id="modal">
      <div className="backdrop" onClick={() => setModal(null)}></div>
      <div className="window animate-fade-in">{modal}</div>
    </div>,
    HTMLElement
  );
}
