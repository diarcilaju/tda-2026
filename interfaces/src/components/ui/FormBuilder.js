import { el, button } from "./dom.js";
import FormField from "./FormField.js";
export default function FormBuilder({ fields, values = {}, onSave, onCancel, readOnly = false, saving = false }) {
  const form = el("form", { className: "form-builder" }); const grid = el("div", { className: "form-grid" });
  for (const field of fields) { if (field.name === "password" && values.id) continue; const control = FormField({ field, value: values[field.name], readOnly }); if (field.name === "activo" && typeof values.activo === "boolean") control.querySelector("select").value = values.activo ? "Sí" : "No"; grid.append(control); }
  form.append(grid); const error = el("p", { className: "form-error", role: "alert" }); const actions = el("div", { className: "modal-actions" }); let saveButton;
  if (onCancel) actions.append(button("Cancelar", onCancel, "button quiet"));
  if (!readOnly) { saveButton = button(saving ? "Guardando..." : "Guardar", null, "button primary"); saveButton.type = "submit"; saveButton.disabled = saving; actions.append(saveButton); }
  else if (onCancel) actions.append(button("Cerrar", onCancel, "button primary"));
  form.append(error, actions);
  form.addEventListener("submit", async (event) => { event.preventDefault(); if (!form.reportValidity()) return; const data = Object.fromEntries(new FormData(form)); for (const input of form.querySelectorAll("input[type=number]")) data[input.name] = Number(input.value); for (const select of form.querySelectorAll("select[multiple]")) data[select.name] = [...select.selectedOptions].map((option) => option.value); if ("activo" in data) data.activo = data.activo === "Sí"; try { saveButton.disabled = true; await onSave(data); } catch (issue) { error.textContent = issue.message || "No se pudo guardar el registro."; saveButton.disabled = false; } });
  return form;
}