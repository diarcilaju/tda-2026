import Chart from "chart.js/auto";
import { el } from "./dom.js";
export default function ChartCard({ title, labels, values, type = "line", color = "#176b58" }) {
  const wrap = el("section", { className: "panel chart-card" }); wrap.append(el("h2", { className: "panel-title", text: title }));
  const canvas = el("canvas", { "aria-label": title, role: "img" }); wrap.append(canvas);
  new Chart(canvas, { type, data: { labels, datasets: [{ data: values, borderColor: color, backgroundColor: type === "line" ? "rgba(23,107,88,.12)" : ["#176b58", "#e2a63b", "#5c8cb8", "#d57c62", "#85aa7a"], borderWidth: 2, fill: type === "line", tension: .35, borderRadius: type === "bar" ? 5 : 0 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: type === "doughnut" } }, scales: type === "doughnut" ? {} : { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: "rgba(120,140,130,.12)" } } } } });
  return wrap;
}