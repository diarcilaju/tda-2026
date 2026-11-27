import { el } from "./dom.js";
export default function Badge({ value }) {
  const text = String(value ?? "—"); const lower = text.toLowerCase();
  const tone = /recibido|pagado|entregado|activo/.test(lower) ? "good" : /pendiente|ruta|tránsito|preparando/.test(lower) ? "warning" : /anulado|incidencia|inactivo/.test(lower) ? "bad" : "neutral";
  return el("span", { className: `badge ${tone}`, text });
}