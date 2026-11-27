import { estaAutenticado, obtenerUsuarioActual } from "./services/authService.js";

export const routes = ["login", "inicio", "almacen", "compras", "ventas", "delivery", "seguridad"];

export function navigate(path) {
  location.hash = `/${path.replace(/^\//, "")}`;
}

export function mountRouter(renderRoute) {
  const resolve = () => {
    const path = location.hash.slice(2).split("?")[0] || "login";
    if (!estaAutenticado() && path !== "login") return navigate("login");
    if (estaAutenticado() && path === "login") return navigate("inicio");
    const user = obtenerUsuarioActual();
    const moduleKey = path.split("/")[0];
    if (user && moduleKey !== "login" && !user.modules.includes(moduleKey)) return renderRoute("acceso-denegado");
    renderRoute(path);
  };
  window.addEventListener("hashchange", resolve);
  resolve();
  return () => window.removeEventListener("hashchange", resolve);
}