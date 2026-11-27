const stores = new Map();
export function repository(name, seed) {
  if (!stores.has(name)) stores.set(name, seed.map((item) => ({ ...item })));
  const rows = () => stores.get(name);
  return {
    async listar() { return rows().map((row) => ({ ...row })); },
    async obtener(id) { const row = rows().find((item) => String(item.id) === String(id)); return row ? { ...row } : null; },
    async crear(values) { const row = { ...values, id: values.id || `${name}-${Date.now()}-${Math.random().toString(16).slice(2, 6)}` }; rows().unshift(row); return { ...row }; },
    async actualizar(id, values) { const index = rows().findIndex((item) => String(item.id) === String(id)); if (index < 0) throw new Error("El registro ya no existe."); rows()[index] = { ...rows()[index], ...values, id: rows()[index].id }; return { ...rows()[index] }; },
    async eliminar(id) { const index = rows().findIndex((item) => String(item.id) === String(id)); if (index < 0) throw new Error("El registro ya no existe."); rows().splice(index, 1); return true; },
  };
}
export async function apiRequest(path, options = {}) {
  // TODO: integrar la URL de config.js y gestionar expiración/renovación del token.
  const session = JSON.parse(sessionStorage.getItem("nexo-session") || localStorage.getItem("nexo-session") || "null");
  return fetch(path, { ...options, headers: { "Content-Type": "application/json", ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}), ...options.headers } });
}