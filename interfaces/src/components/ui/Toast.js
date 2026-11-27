import { el } from "./dom.js";
export function Toast({ message, type = "success" }) {
  const toast = el("div", { className: `toast ${type}`, role: "status", "aria-live": "polite", text: message });
  document.body.append(toast); window.setTimeout(() => toast.remove(), 3200); return toast;
}