# Nexo Comercial

Interfaz de gestión empresarial construida con Node.js, Vite, JavaScript nativo y módulos ES. Los servicios ofrecen CRUD asíncrono con datos de prueba en memoria y pueden sustituirse por llamadas REST sin cambiar páginas ni componentes.

## Inicio

```bash
npm install
npm run dev
```

Para generar la versión de producción: `npm run build`.

## Usuarios de prueba

| Usuario | Contraseña | Rol | Acceso |
| --- | --- | --- | --- |
| `admin` | `Admin123` | Administrador | Todos los módulos |
| `vendedor` | `Venta123` | Vendedor | Inicio, Ventas y Delivery |
| `almacenero` | `Alma123` | Almacén | Inicio, Almacén y Compras |

Los datos de prueba vuelven a su estado inicial al recargar la aplicación. La sesión sí se conserva en `sessionStorage` o `localStorage` según “Recordarme”.

## Extender la aplicación

- **Agregar un módulo:** crea el dashboard en `src/pages`, añade su entrada en `modules` de `src/services/entityRegistry.js`, agrega el acceso y sus listas en `src/components/layout/Sidebar.js`, y registra la página en `src/main.js`. Los permisos se expresan como claves de módulo en `modulos` del rol.
- **Agregar una lista:** crea el servicio usando `repository()` de `src/services/memoryService.js`, define sus campos en `src/forms` y metadatos/columnas en `entityRegistry.js`. Crea el wrapper de lista que invoque `listFactory`, registra su ruta en `src/main.js` y añade el enlace en `Sidebar.js`.
- **Agregar un campo:** agrega una definición `{ name, label, type, required, options, min, max }` al arreglo del formulario correspondiente en `src/forms`. El formulario genera el control a partir de esa definición.
- **Agregar un rol:** crea el rol desde Seguridad → Roles y marca los módulos permitidos. Luego crea o edita un usuario en Seguridad → Usuarios y asígnale ese rol. El usuario podrá ingresar con la contraseña que se estableció al crearlo.

Los servicios están en `src/services`; `apiRequest()` prepara el encabezado `Authorization: Bearer ...`. Sustituye sus repositorios por llamadas REST y configura `VITE_API_URL` para conectar una API real. La validación simulada, la expiración de sesión y los reportes tienen comentarios `TODO` en los puntos de integración.