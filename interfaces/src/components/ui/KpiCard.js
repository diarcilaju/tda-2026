import { el } from "./dom.js";
export default function KpiCard({ label, value, change = "+0%", note = "vs. periodo anterior", tone = "positive" }) {
  return el("article", { className: "kpi-card" }, [el("span", { className: "kpi-label", text: label }), el("strong", { className: "kpi-value", text: value }), el("div", { className: `kpi-change ${tone}`, text: `${change} ${note}` })]);
}