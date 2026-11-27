import { el, button } from "./dom.js";
export default function Toolbar({ links = [], onCreate, onReports }) {
  const group = el("div", { className: "toolbar" });
  for (const link of links) group.append(el("a", { className: "button quiet", href: `#/${link.path}`, text: link.label }));
  if (onReports) group.append(button("Reportes", onReports, "button quiet"));
  if (onCreate) group.append(button("＋ Nuevo", onCreate, "button primary")); return group;
}