import { el } from "../ui/dom.js";
const modules = [
  { key: "inicio", label: "Inicio", icon: "⌂", links: [] },
  { key: "almacen", label: "Almacén", icon: "▦", links: [["productos", "Productos"]] },
  { key: "compras", label: "Compras", icon: "↙", links: [["proveedores", "Proveedores"], ["ordenes-compra", "Órdenes de compra"]] },
  { key: "ventas", label: "Ventas", icon: "↗", links: [["clientes", "Clientes"], ["registro", "Ventas"]] },
  { key: "delivery", label: "Delivery", icon: "⌁", links: [["entregas", "Entregas"]] },
  { key: "seguridad", label: "Seguridad", icon: "◇", links: [["usuarios", "Usuarios"], ["roles", "Roles"]] },
];
export default function Sidebar({ user, path, collapsed = false }) {
  const aside = el("aside", { className: `sidebar${collapsed ? " collapsed" : ""}` });
  const brand = el("a", { className: "brand", href: "#/inicio" }, [el("span", { className: "brand-mark", text: "N" }), el("span", { className: "brand-name", text: "nexo" })]);
  aside.append(brand);
  const nav = el("nav", { className: "side-nav", "aria-label": "Navegación principal" });
  for (const item of modules.filter((entry) => user.modules.includes(entry.key))) {
    const active = path === item.key || path.startsWith(`${item.key}/`);
    const link = el("a", { className: `nav-link${active ? " active" : ""}`, href: `#/${item.key}`, "aria-current": active ? "page" : null }, [el("span", { className: "nav-icon", "aria-hidden": "true", text: item.icon }), el("span", { className: "nav-label", text: item.label })]); nav.append(link);
    if (active && item.links.length) for (const [slug, label] of item.links) nav.append(el("a", { className: `subnav-link${path.endsWith(slug) ? " selected" : ""}`, href: `#/${item.key}/${slug}`, text: label }));
  }
  aside.append(nav, el("div", { className: "sidebar-foot" }, [el("span", { className: "online-dot" }), el("span", { text: "Sistema operativo" })])); return aside;
}