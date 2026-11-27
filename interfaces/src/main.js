import "./styles/variables.css";
import "./styles/base.css";
import "./styles/login.css";
import "./styles/layout.css";
import "./styles/components.css";
import { mountRouter } from "./router.js";
import { obtenerUsuarioActual } from "./services/authService.js";
import { entities, modules } from "./services/entityRegistry.js";
import Layout from "./components/layout/Layout.js";
import LoginPage from "./pages/LoginPage.js";
import InicioPage from "./pages/InicioPage.js";
import AlmacenPage from "./pages/AlmacenPage.js";
import ComprasPage from "./pages/ComprasPage.js";
import VentasPage from "./pages/VentasPage.js";
import DeliveryPage from "./pages/DeliveryPage.js";
import SeguridadPage from "./pages/SeguridadPage.js";
import AccesoDenegadoPage from "./pages/AccesoDenegadoPage.js";
import ProductosList from "./pages/listas/ProductosList.js";
import ProveedoresList from "./pages/listas/ProveedoresList.js";
import OrdenesCompraList from "./pages/listas/OrdenesCompraList.js";
import ClientesList from "./pages/listas/ClientesList.js";
import VentasList from "./pages/listas/VentasList.js";
import EntregasList from "./pages/listas/EntregasList.js";
import UsuariosList from "./pages/listas/UsuariosList.js";
import RolesList from "./pages/listas/RolesList.js";
import { Toast } from "./components/ui/Toast.js";

const root = document.querySelector("#app");
const dashboards = { inicio: InicioPage, almacen: AlmacenPage, compras: ComprasPage, ventas: VentasPage, delivery: DeliveryPage, seguridad: SeguridadPage };
const lists = { productos: ProductosList, proveedores: ProveedoresList, "ordenes-compra": OrdenesCompraList, clientes: ClientesList, registro: VentasList, entregas: EntregasList, usuarios: UsuariosList, roles: RolesList };
window.addEventListener("nexo:toast", (event) => Toast({ message: event.detail, type: "info" }));

mountRouter(async (path) => {
  root.replaceChildren();
  if (path === "login") { root.append(LoginPage()); return; }
  if (path === "acceso-denegado") { root.append(Layout({ user: obtenerUsuarioActual(), path: "", content: AccesoDenegadoPage() })); return; }
  const [moduleKey, child] = path.split("/");
  let content;
  if (child) {
    const entityKey = Object.keys(entities).find((key) => entities[key].module === moduleKey && entities[key].path.split("/")[1] === child);
    const List = lists[child];
    if (!entityKey || !List) { root.append(Layout({ user: obtenerUsuarioActual(), path, content: AccesoDenegadoPage() })); return; }
    content = await List();
    if (new URLSearchParams(location.hash.split("?")[1] || "").has("nuevo")) {
      history.replaceState(null, "", `${location.pathname}${location.search}#/${path}`);
      window.dispatchEvent(new CustomEvent("nexo:create", { detail: entityKey }));
    }
  } else {
    const Dashboard = dashboards[moduleKey];
    if (!Dashboard || !modules[moduleKey]) { root.append(Layout({ user: obtenerUsuarioActual(), path, content: AccesoDenegadoPage() })); return; }
    content = await Dashboard();
  }
  root.append(Layout({ user: obtenerUsuarioActual(), path, content }));
});