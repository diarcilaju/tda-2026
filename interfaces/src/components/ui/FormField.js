import { el } from "./dom.js";
export default function FormField({ field, value, readOnly = false }) {
  const label = el("label", { className: "form-field" }); label.append(el("span", { text: `${field.label}${field.required ? " *" : ""}` })); let input;
  if (field.type === "select" || field.type === "multiselect") {
    input = el("select", { name: field.name, required: field.required ? "required" : null, multiple: field.type === "multiselect" ? "multiple" : null, disabled: readOnly ? "disabled" : null });
    if (field.type === "select") input.append(el("option", { value: "", text: "Seleccionar..." }));
    for (const option of field.options || []) { const opt = el("option", { value: option, text: option }); if ((Array.isArray(value) ? value : [value]).includes(option)) opt.selected = true; input.append(opt); }
  } else input = el("input", { name: field.name, type: field.type || "text", value: value ?? "", required: field.required ? "required" : null, min: field.min, max: field.max, step: field.type === "number" ? "any" : null, readOnly: readOnly ? "readonly" : null });
  input.dataset.label = field.label; label.append(input); return label;
}