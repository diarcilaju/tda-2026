//Listas
const tareas=['Estudiar','Leer','Bailar'];
//Agregar al final
tareas.push('Limpiar');
//Agregar al inicio
tareas.unshift('Cenar');
//Eliminar el último elemento
tareas.pop();
//ELiminar el primer elemento
tareas.shift();

//Recorrer toda la tareas
for(const t of tareas){
    console.log(t);
}
  