import { el, button } from "../../components/ui/dom.js";
import DataTable from "../../components/ui/DataTable.js";
import Toolbar from "../../components/ui/Toolbar.js";
import FormBuilder from "../../components/ui/FormBuilder.js";
import Modal from "../../components/ui/Modal.js";
import ConfirmDialog from "../../components/ui/ConfirmDialog.js";
import { Toast } from "../../components/ui/Toast.js";
import { entities } from "../../services/entityRegistry.js";
import { listar as listarRoles } from "../../services/rolService.js";
export default async function listFactory(key) {
  const entity = entities[key]; const page = el("div", { className: "list-page" }); let records = await entity.service.listar();
  const refresh = async () => { records = await entity.service.listar(); tableSlot.replaceChildren(DataTable({ columns: entity.columns, rows: records, onView: (row) => openForm(row, true), onEdit: (row) => openForm(row), onDelete: (row) => confirmDelete(row), onCreate: () => openForm(null) })); };
  const openForm = async (row, readOnly = false) => {
    const fields = entity.fields.map((field) => ({ ...field, options: field.options ? [...field.options] : undefined }));
    if (key === "usuarios") { const roles = await listarRoles(); const field = fields.find((item) => item.name === "rol"); field.options = roles.map((item) => item.nombre); }
    if (key === "ordenes") fields.find((item) => item.name === "proveedor").options = (await entities.proveedores.service.listar()).map((item) => item.razonSocial);
    if (key === "ventas") fields.find((item) => item.name === "cliente").options = (await entities.clientes.service.listar()).map((item) => item.nombre);
    const title = readOnly ? `Detalle: ${entity.title}` : row ? `Editar ${entity.title.toLowerCase()}` : `Nuevo ${entity.title.toLowerCase()}`;
    let modal; const form = FormBuilder({ fields, values: row || {}, readOnly, onCancel: () => modal.close(), onSave: async (values) => { if (key === "usuarios" && !row && !values.password) throw new Error("La contraseña es obligatoria."); if (key === "usuarios" && !values.password) delete values.password; if (row) await entity.service.actualizar(row.id, values); else await entity.service.crear(values); modal.close(); Toast({ message: `${entity.title} ${row ? "actualizado" : "creado"} correctamente.` }); await refresh(); } });
    modal = Modal({ title, content: form, onClose: () => modal.close() });
  };
  const confirmDelete = (row) => ConfirmDialog({ message: `¿Eliminar "${row[entity.columns[1]?.key] || row.nombre || row.id}"? Esta acción no se puede deshacer.`, onConfirm: async () => { try { await entity.service.eliminar(row.id); Toast({ message: "Registro eliminado." }); await refresh(); } catch (issue) { Toast({ message: issue.message, type: "error" }); } } });
  const header = el("section", { className: "page-heading" }, [el("div", {}, [el("span", { className: "eyebrow", text: "GESTIÓN DE DATOS" }), el("h1", { text: entity.title }), el("p", { text: `Administra los registros de ${entity.title.toLocaleLowerCase()}.` })]), Toolbar({ onCreate: () => openForm(null), onReports: () => { /* TODO: filtros por fecha y exportación a PDF/Excel. */ Toast({ message: "Reportes próximamente.", type: "info" }); } })]);
  const tableSlot = el("section", { className: "panel list-panel" }); page.append(header, tableSlot); await refresh();
  window.addEventListener("nexo:create", (event) => { if (event.detail === key) openForm(null); }, { once: true }); return page;
}