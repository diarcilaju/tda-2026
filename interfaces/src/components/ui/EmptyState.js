import { el, button } from "./dom.js";
export default function EmptyState({ title = "Todavía no hay registros", description = "Crea el primer registro para comenzar.", onCreate }) {
  const children = [el("span", { className: "empty-mark", text: "＋" }), el("h3", { text: title }), el("p", { text: description })];
  if (onCreate) children.push(button("Nuevo registro", onCreate, "button primary"));
  return el("div", { className: "empty-state" }, children);
}