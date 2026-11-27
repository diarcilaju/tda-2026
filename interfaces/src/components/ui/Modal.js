import { el, button } from "./dom.js";
export default function Modal({ title, content, onClose }) {
  const dialog = el("dialog", { className: "modal" }); const header = el("header", { className: "modal-header" }, [el("h2", { text: title }), button("×", onClose, "icon-button modal-close")]);
  dialog.append(header, content); document.body.append(dialog); dialog.showModal();
  const close = () => { if (dialog.open) dialog.close(); dialog.remove(); document.removeEventListener("keydown", onKey); };
  const onKey = (event) => { if (event.key === "Escape") close(); }; document.addEventListener("keydown", onKey); dialog.addEventListener("click", (event) => { if (event.target === dialog) close(); });
  return { close, element: dialog };
}