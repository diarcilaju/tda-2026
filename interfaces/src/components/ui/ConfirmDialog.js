import { el, button } from "./dom.js";
import Modal from "./Modal.js";
export default function ConfirmDialog({ title = "Confirmar eliminación", message, onConfirm }) {
  let modal; const body = el("div", { className: "confirm-body" }, [el("p", { text: message }), el("div", { className: "modal-actions" }, [button("Cancelar", () => modal.close(), "button quiet"), button("Eliminar", async () => { await onConfirm(); modal.close(); }, "button danger")])]);
  modal = Modal({ title, content: body, onClose: () => modal.close() }); return modal;
}