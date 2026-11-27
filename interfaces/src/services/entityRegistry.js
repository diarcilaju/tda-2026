import * as productos from "./productoService.js";
import * as proveedores from "./proveedorService.js";
import * as ordenes from "./ordenCompraService.js";
import * as clientes from "./clienteService.js";
import * as ventas from "./ventaService.js";
import * as entregas from "./entregaService.js";
import * as usuarios from "./usuarioService.js";
import * as roles from "./rolService.js";
import productoForm from "../forms/productoForm.js";
import proveedorForm from "../forms/proveedorForm.js";
import ordenCompraForm from "../forms/ordenCompraForm.js";
import clienteForm from "../forms/clienteForm.js";
import ventaForm from "../forms/ventaForm.js";
import entregaForm from "../forms/entregaForm.js";
import usuarioForm from "../forms/usuarioForm.js";
import rolForm from "../forms/rolForm.js";

export const entities = {
  productos: { title: "Productos", module: "almacen", path: "almacen/productos", service: productos, fields: productoForm, columns: [{ key: "codigo", label: "Código" }, { key: "nombre", label: "Producto" }, { key: "categoria", label: "Categoría" }, { key: "precio", label: "Precio", format: (v) => `S/ ${Number(v).toFixed(2)}` }, { key: "stock", label: "Stock" }] },
  proveedores: { title: "Proveedores", module: "compras", path: "compras/proveedores", service: proveedores, fields: proveedorForm, columns: [{ key: "ruc", label: "RUC" }, { key: "razonSocial", label: "Razón social" }, { key: "contacto", label: "Contacto" }, { key: "telefono", label: "Teléfono" }, { key: "correo", label: "Correo" }] },
  ordenes: { title: "Órdenes de compra", module: "compras", path: "compras/ordenes-compra", service: ordenes, fields: ordenCompraForm, columns: [{ key: "id", label: "Orden" }, { key: "proveedor", label: "Proveedor" }, { key: "fecha", label: "Fecha" }, { key: "estado", label: "Estado", badge: true }, { key: "total", label: "Total", format: (v) => `S/ ${Number(v).toFixed(2)}` }] },
  clientes: { title: "Clientes", module: "ventas", path: "ventas/clientes", service: clientes, fields: clienteForm, columns: [{ key: "documento", label: "Documento" }, { key: "nombre", label: "Nombre" }, { key: "ciudad", label: "Ciudad" }, { key: "telefono", label: "Teléfono" }, { key: "correo", label: "Correo" }] },
  ventas: { title: "Ventas", module: "ventas", path: "ventas/registro", service: ventas, fields: ventaForm, columns: [{ key: "id", label: "Venta" }, { key: "cliente", label: "Cliente" }, { key: "fecha", label: "Fecha" }, { key: "estado", label: "Estado", badge: true }, { key: "total", label: "Total", format: (v) => `S/ ${Number(v).toFixed(2)}` }] },
  entregas: { title: "Entregas", module: "delivery", path: "delivery/entregas", service: entregas, fields: entregaForm, columns: [{ key: "id", label: "Entrega" }, { key: "pedido", label: "Pedido" }, { key: "repartidor", label: "Repartidor" }, { key: "direccion", label: "Dirección" }, { key: "estado", label: "Estado", badge: true }, { key: "fecha", label: "Fecha" }] },
  usuarios: { title: "Usuarios", module: "seguridad", path: "seguridad/usuarios", service: usuarios, fields: usuarioForm, columns: [{ key: "usuario", label: "Usuario" }, { key: "nombre", label: "Nombre" }, { key: "correo", label: "Correo" }, { key: "rol", label: "Rol" }, { key: "activo", label: "Estado", format: (v) => v ? "Activo" : "Inactivo" }] },
  roles: { title: "Roles", module: "seguridad", path: "seguridad/roles", service: roles, fields: rolForm, columns: [{ key: "nombre", label: "Rol" }, { key: "descripcion", label: "Descripción" }, { key: "modulos", label: "Módulos", format: (v) => (v || []).join(", ") }] },
};

export const modules = {
  inicio: { title: "Inicio", description: "Una vista clara de lo que sucede hoy en tu negocio.", entities: ["ventas", "ordenes", "productos", "entregas"], kpis: ["Ventas del día", "Pedidos pendientes", "Productos con stock bajo", "Entregas en curso"] },
  almacen: { title: "Almacén", description: "Controla existencias, niveles y valor del inventario.", entities: ["productos"], kpis: ["Total de productos", "Stock bajo", "Valor del inventario", "Movimientos de hoy"] },
  compras: { title: "Compras", description: "Coordina proveedores y órdenes de abastecimiento.", entities: ["ordenes", "proveedores"], kpis: ["Órdenes del mes", "Proveedores activos", "Monto comprado", "Órdenes por recibir"] },
  ventas: { title: "Ventas", description: "Sigue el ritmo comercial y la relación con tus clientes.", entities: ["ventas", "clientes"], kpis: ["Ventas del mes", "Ticket promedio", "Clientes nuevos", "Productos vendidos"] },
  delivery: { title: "Delivery", description: "Mantén cada entrega visible, desde la preparación hasta la puerta.", entities: ["entregas"], kpis: ["Pedidos en ruta", "Entregados hoy", "Tiempo promedio", "Repartidores activos"] },
  seguridad: { title: "Seguridad", description: "Administra usuarios, roles y permisos de acceso.", entities: ["usuarios", "roles"], kpis: ["Usuarios activos", "Roles", "Accesos del día", "Intentos fallidos"] },
};