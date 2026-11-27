import { el, button } from "../components/ui/dom.js";
import { login } from "../services/authService.js";
import { navigate } from "../router.js";
export default function LoginPage() {
  const page = el("main", { className: "login-screen" });
  const decoration = el("section", { className: "login-aside" }, [el("a", { className: "login-brand", href: "#/login" }, [el("span", { className: "brand-mark", text: "N" }), el("span", { text: "nexo" })]), el("div", { className: "login-message" }, [el("span", { className: "eyebrow", text: "GESTIÓN COMERCIAL" }), el("h1", { text: "Todo conectado.\nTodo bajo control." }), el("p", { text: "Una mirada clara para tomar mejores decisiones cada día." })]), el("span", { className: "login-aside-foot", text: "Nexo Comercial · 2026" })]);
  const section = el("section", { className: "login-main" });
  const form = el("form", { className: "login-form" }); form.append(el("span", { className: "eyebrow", text: "BIENVENIDO DE VUELTA" }), el("h2", { text: "Inicia sesión" }), el("p", { className: "login-intro", text: "Ingresa tus datos para continuar." }));
  const userLabel = el("label", { className: "form-field" }, [el("span", { text: "Usuario" }), el("input", { name: "username", autocomplete: "username", required: "required", placeholder: "Tu usuario" })]);
  const password = el("input", { name: "password", type: "password", autocomplete: "current-password", required: "required", placeholder: "Tu contraseña" });
  const passwordLabel = el("label", { className: "form-field" }, [el("span", { text: "Contraseña" }), password]);
  const show = el("label", { className: "show-password" }, [el("input", { type: "checkbox" }), el("span", { text: "Mostrar contraseña" })]); show.querySelector("input").addEventListener("change", (event) => { password.type = event.target.checked ? "text" : "password"; });
  const remember = el("label", { className: "remember-check" }, [el("input", { type: "checkbox", name: "remember" }), el("span", { text: "Recordarme en este dispositivo" })]);
  const error = el("p", { className: "form-error", role: "alert" }); const submit = button("Ingresar", null, "button primary login-submit"); submit.type = "submit";
  form.append(userLabel, passwordLabel, show, remember, error, submit);
  form.addEventListener("submit", async (event) => { event.preventDefault(); if (!form.reportValidity()) return; submit.disabled = true; submit.textContent = "Validando..."; error.textContent = ""; try { const data = new FormData(form); await login(data.get("username"), data.get("password"), data.has("remember")); navigate("inicio"); } catch (issue) { error.textContent = issue.message; } finally { submit.disabled = false; submit.textContent = "Ingresar"; } });
  section.append(form, el("p", { className: "login-support", text: "¿Necesitas ayuda? Contacta a tu administrador." })); page.append(decoration, section); return page;
}