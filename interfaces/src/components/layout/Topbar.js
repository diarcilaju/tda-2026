import { el, button } from "../ui/dom.js";
import { logout } from "../../services/authService.js";
import { navigate } from "../../router.js";
export default function Topbar({ user, onToggleMenu }) {
  const bar = el("header", { className: "topbar" });
  bar.append(button("☰", onToggleMenu, "icon-button menu-toggle"));
  const search = el("label", { className: "global-search" }, [el("span", { "aria-hidden": "true", text: "⌕" }), el("input", { type: "search", placeholder: "Buscar en Nexo", "aria-label": "Buscar en Nexo" })]); bar.append(search);
  bar.append(button("♧", () => window.dispatchEvent(new CustomEvent("nexo:toast", { detail: "No tienes notificaciones nuevas." })), "icon-button notification-button"));
  const profile = el("details", { className: "profile-menu" });
  profile.append(el("summary", { className: "profile-trigger" }, [el("span", { className: "avatar", text: user.name.slice(0, 1).toUpperCase() }), el("span", { className: "profile-copy" }, [el("strong", { text: user.name }), el("small", { text: user.role })]), el("span", { text: "⌄" })]));
  const menu = el("div", { className: "profile-dropdown" }); menu.append(el("span", { className: "profile-email", text: user.username })); menu.append(button("Cerrar sesión", () => { logout(); navigate("login"); }, "profile-logout")); profile.append(menu); bar.append(profile); return bar;
}