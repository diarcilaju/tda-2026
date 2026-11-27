import { el, button } from "./dom.js";
import Badge from "./Badge.js";
import EmptyState from "./EmptyState.js";
export default function DataTable({ columns, rows, onView, onEdit, onDelete, onCreate, searchable = true }) {
  if (!rows.length) return EmptyState({ onCreate });
  const wrap = el("div", { className: "data-table-wrap" }); let search = ""; let sortKey = ""; let direction = 1; let page = 0; const pageSize = 6;
  const toolbar = el("div", { className: "table-tools" });
  if (searchable) { const input = el("input", { type: "search", placeholder: "Buscar registros...", "aria-label": "Buscar registros" }); input.addEventListener("input", () => { search = input.value.toLocaleLowerCase(); page = 0; render(); }); toolbar.append(input); }
  const tableWrap = el("div", { className: "table-scroll" }); const table = el("table"); const head = el("thead"); const body = el("tbody"); const pager = el("div", { className: "pagination" });
  const render = () => {
    const filtered = rows.filter((row) => Object.values(row).some((value) => String(value ?? "").toLocaleLowerCase().includes(search)));
    if (sortKey) filtered.sort((a, b) => String(a[sortKey] ?? "").localeCompare(String(b[sortKey] ?? ""), "es", { numeric: true }) * direction);
    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize)); page = Math.min(page, pageCount - 1);
    const header = el("tr");
    for (const col of columns) { const th = el("th"); th.append(button(`${col.label}${sortKey === col.key ? direction === 1 ? " ↑" : " ↓" : ""}`, () => { direction = sortKey === col.key ? -direction : 1; sortKey = col.key; render(); }, "table-sort")); header.append(th); }
    if (onView || onEdit || onDelete) header.append(el("th", { text: "Acciones" })); head.replaceChildren(header);
    body.replaceChildren(...filtered.slice(page * pageSize, (page + 1) * pageSize).map((row) => {
      const tr = el("tr");
      for (const col of columns) { const td = el("td"); const value = row[col.key]; td.append(col.badge ? Badge({ value }) : document.createTextNode(col.format ? col.format(value, row) : String(value ?? "—"))); tr.append(td); }
      if (onView || onEdit || onDelete) { const td = el("td", { className: "row-actions" }); if (onView) td.append(button("Ver", () => onView(row), "text-button")); if (onEdit) td.append(button("Editar", () => onEdit(row), "text-button")); if (onDelete) td.append(button("Eliminar", () => onDelete(row), "text-button danger-text")); tr.append(td); }
      return tr;
    }));
    const info = el("span", { text: `${filtered.length ? page * pageSize + 1 : 0}–${Math.min((page + 1) * pageSize, filtered.length)} de ${filtered.length}` });
    pager.replaceChildren(button("←", () => { page = Math.max(0, page - 1); render(); }, "icon-button"), info, button("→", () => { page = Math.min(pageCount - 1, page + 1); render(); }, "icon-button"));
  };
  table.append(head, body); tableWrap.append(table); wrap.append(toolbar, tableWrap, pager); render(); return wrap;
}