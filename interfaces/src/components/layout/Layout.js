import { el } from "../ui/dom.js";
import Sidebar from "./Sidebar.js";
import Topbar from "./Topbar.js";
export default function Layout({ user, path, content }) {
  const shell = el("div", { className: "app-shell" }); let collapsed = false;
  const sidebar = Sidebar({ user, path }); const main = el("div", { className: "main-column" });
  const topbar = Topbar({ user, onToggleMenu: () => { collapsed = !collapsed; sidebar.classList.toggle("mobile-open", collapsed); sidebar.classList.toggle("collapsed", collapsed); shell.classList.toggle("sidebar-collapsed", collapsed); } });
  const page = el("main", { className: "page-content" }); if (content) page.append(content);
  main.append(topbar, page); shell.append(sidebar, main); return shell;
}