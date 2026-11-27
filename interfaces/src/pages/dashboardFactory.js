import { el, button } from "../components/ui/dom.js";
import Toolbar from "../components/ui/Toolbar.js";
import KpiCard from "../components/ui/KpiCard.js";
import ChartCard from "../components/ui/ChartCard.js";
import DataTable from "../components/ui/DataTable.js";
import { entities, modules } from "../services/entityRegistry.js";
import { obtenerUsuarioActual } from "../services/authService.js";
import { Toast } from "../components/ui/Toast.js";

function amount(rows) { return rows.reduce((sum, row) => sum + Number(row.total || row.precio * row.stock || 0), 0); }
export default async function dashboardFactory(key) {
  const config = modules[key]; const user = obtenerUsuarioActual(); const data = await Promise.all(config.entities.map((name) => entities[name].service.listar()));
  const first = entities[config.entities[0]];
  const page = el("div", { className: "dashboard" });
  const actions = Toolbar({ links: config.entities.map((name) => ({ path: entities[name].path, label: entities[name].title })), onCreate: key === "inicio" ? null : () => { const entity = entities[config.entities[0]]; location.hash = `#/${entity.path}?nuevo=1`; }, onReports: () => Toast({ message: "Los reportes estarán disponibles próximamente.", type: "info" }) });
  let title = config.title; let description = config.description;
  if (key === "inicio") { title = `Hola, ${user.name.split(" ")[0]}`; description = "Aquí tienes el pulso de tu negocio para hoy."; }
  page.append(el("section", { className: "page-heading" }, [el("div", {}, [el("span", { className: "eyebrow", text: key === "inicio" ? "RESUMEN GENERAL" : "CENTRO DE OPERACIONES" }), el("h1", { text: title }), el("p", { text: description })]), actions]));
  const productRows = (await entities.productos.service.listar()); const orderRows = await entities.ordenes.service.listar(); const saleRows = await entities.ventas.service.listar(); const deliveryRows = await entities.entregas.service.listar(); const userRows = await entities.usuarios.service.listar(); const roleRows = await entities.roles.service.listar();
  const states = {
    inicio: [saleRows.filter((r) => r.fecha === new Date().toISOString().slice(0, 10)).length || saleRows.length, orderRows.filter((r) => r.estado === "Pendiente").length, productRows.filter((r) => r.stock <= r.stockMinimo).length, deliveryRows.filter((r) => r.estado === "En ruta").length],
    almacen: [productRows.length, productRows.filter((r) => r.stock <= r.stockMinimo).length, `S/ ${amount(productRows).toLocaleString("es-PE")}`, 12],
    compras: [orderRows.length, (await entities.proveedores.service.listar()).length, `S/ ${amount(orderRows).toLocaleString("es-PE")}`, orderRows.filter((r) => r.estado !== "Recibido").length],
    ventas: [saleRows.length, `S/ ${(amount(saleRows) / Math.max(saleRows.length, 1)).toFixed(0)}`, (await entities.clientes.service.listar()).length, 184],
    delivery: [deliveryRows.filter((r) => r.estado === "En ruta").length, deliveryRows.filter((r) => r.estado === "Entregado").length, "34 min", new Set(deliveryRows.map((r) => r.repartidor)).size],
    seguridad: [userRows.filter((r) => r.activo).length, roleRows.length, 28, 2],
  }[key];
  const kpis = el("section", { className: "kpi-grid" }); config.kpis.forEach((label, index) => kpis.append(KpiCard({ label, value: states[index] ?? states[index], change: ["+12.8%", "+4.2%", "−2.1%", "+8.4%"][index], tone: index === 2 ? "neutral" : "positive" }))); page.append(kpis);
  const charts = el("section", { className: "chart-grid" }); const chartRows = key === "almacen" ? productRows : key === "compras" ? orderRows : key === "delivery" ? deliveryRows : key === "seguridad" ? userRows : saleRows;
  const labels = chartRows.slice(0, 5).map((row, index) => row.nombre || row.proveedor || row.estado || row.fecha || row.id || `Dato ${index + 1}`);
  const values = chartRows.slice(0, 5).map((row) => Number(row.total || row.stock || 1));
  charts.append(ChartCard({ title: key === "almacen" ? "Stock por producto" : key === "compras" ? "Compras por proveedor" : key === "delivery" ? "Entregas por estado" : key === "seguridad" ? "Usuarios por rol" : key === "ventas" ? "Ventas recientes" : "Ventas de los últimos 7 días", labels: labels.length ? labels : ["Sin datos"], values: values.length ? values : [0], type: key === "delivery" || key === "seguridad" ? "doughnut" : "line" }));
  if (key === "inicio" || key === "ventas") charts.append(ChartCard({ title: "Actividad semanal", labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"], values: [18, 24, 21, 32, 29, 41, 36], type: "bar", color: "#d29435" }));
  else charts.append(el("section", { className: "panel insight-panel" }, [el("span", { className: "insight-label", text: "A TENER EN CUENTA" }), el("strong", { text: key === "almacen" ? "2 productos necesitan reposición" : key === "compras" ? "1 orden está pendiente de recepción" : key === "delivery" ? "2 pedidos siguen en preparación" : "Revisa los accesos recientes" }), el("p", { text: "Los datos se actualizan desde los registros de este espacio." }), button("Ver registros", () => { location.hash = `#/${first.path}`; }, "text-button")]));
  page.append(charts);
  const recent = (data[0] || []).slice(0, 6); const recentEntity = first;
  page.append(el("section", { className: "panel recent-panel" }, [el("div", { className: "panel-heading" }, [el("div", {}, [el("span", { className: "eyebrow", text: "ACTIVIDAD" }), el("h2", { className: "panel-title", text: key === "seguridad" ? "Últimos accesos" : "Registros recientes" })]), button("Ver lista →", () => { location.hash = `#/${recentEntity.path}`; }, "text-button")]), DataTable({ columns: recentEntity.columns.slice(0, 4), rows: recent, searchable: false })]));
  return page;
}