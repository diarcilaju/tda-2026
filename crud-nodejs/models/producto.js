import db from '../config/db.js';

export default class Producto {
  static async todos(){
    const [filas] = await db.query('SELECT * FROM productos ORDER BY id DESC');
    return filas;
  }
  static async obtener(id){
    const [filas] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
    return filas[0];
  }
  static async crear(nombre, precio, stock){
    await db.query('INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)', [nombre, precio, stock]);
  }
  static async actualizar(id, nombre, precio, stock){
    await db.query('UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?', [nombre, precio, stock, id]); 
  }
  static async eliminar(id){
    await db.query('DELETE FROM productos WHERE id = ?', [id]);
  }
}