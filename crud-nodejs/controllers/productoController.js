import Producto from '../models/producto.js';
function validar({nombre, precio, stock}){
    const errores = [];
    if(!nombre || nombre.trim().length <2){
        errores.push('El nombre es obligatorio y debe tener al menos 2 caracteres');
    }
    if(precio==='' || isNaN(precio) || Number(precio) < 0){
        errores.push('El precio es obligatorio y debe ser un número positivo');
    }
    if(stock==='' || isNaN(stock) || Number(stock) < 0){
        errores.push('El stock es obligatorio y debe ser un número positivo');
    }
    return errores; 
}

export const listar = async (req, res) => {
    res.render('productos/lista', {productos:await Producto.todos()});
}

export const fomularioNuevo = (req, res) => {
    res.render('productos/formulario', {titulo:'Nuevo Producto', accion:'/productos', producto:{}, errores:[]});
}

export const crear = async (req, res) => {
    const errores = validar(req.body);
    if(errores.length > 0){
        res.render('productos/formulario', {titulo:'Nuevo Producto', accion:'/productos', producto:req.body, errores});
    }
    await Producto.crear(req.body);
    res.redirect('/productos');
}
export const fomularioEditar = async (req, res) => {
    const producto = await Producto.obtener(req.params.id);
    if(!producto){
        return res.status(404).send('Producto no encontrado');
    }
    res.render('productos/formulario', {titulo:'Editar Producto', accion:`/productos/${producto.id}/actualizar`, producto, errores:[]});
}

export const editar = async (req, res) => {
    const errores = validar(req.body);
    if(errores.length > 0){
        res.render('productos/formulario', {titulo:'Editar Producto', accion:`/productos/${req.params.id}/actualizar`, producto:req.body, errores});
    }
    await Producto.actualizar(req.params.id, req.body);
    res.redirect('/productos');
}

export const eliminar = async (req, res) => {
    await Producto.eliminar(req.params.id);
    res.redirect('/productos');
}  