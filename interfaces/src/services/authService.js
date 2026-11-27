import { listar as listarUsuarios } from "./usuarioService.js";
import { listar as listarRoles } from "./rolService.js";

const storageKey = "nexo-session";
function readSession() { try { return JSON.parse(sessionStorage.getItem(storageKey) || localStorage.getItem(storageKey) || "null"); } catch { return null; } }
export async function login(username, password, remember = false) {
	// TODO: reemplazar esta validación simulada por la API y controlar la expiración del token.
	const users = await listarUsuarios();
	const user = users.find((item) => item.usuario.toLowerCase() === username.trim().toLowerCase() && item.password === password && item.activo);
	if (!user) throw new Error("Usuario o contraseña incorrectos.");
	const roles = await listarRoles();
	const role = roles.find((item) => item.nombre === user.rol);
	if (!role) throw new Error("El rol de este usuario ya no está disponible.");
	const session = { token: `demo-${Date.now()}`, user: { id: user.id, username: user.usuario, name: user.nombre, role: user.rol, modules: role.modulos } };
	(remember ? localStorage : sessionStorage).setItem(storageKey, JSON.stringify(session));
	(remember ? sessionStorage : localStorage).removeItem(storageKey);
	return session.user;
}
export function logout() { sessionStorage.removeItem(storageKey); localStorage.removeItem(storageKey); }
export function obtenerUsuarioActual() { return readSession()?.user || null; }
export function estaAutenticado() { return Boolean(readSession()?.token); }