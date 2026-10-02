function operacionConstante(arreglo){
    return arreglo[0];
}


// O(n): Líneal, recorre el arreglo una sóla vez
function sumarTodos(arreglo){
    let total= 0;
    for (let i = 0; i < arreglo.length; i++) {
        total=total+arreglo[i];
    }
    return total;
}

//O(n2): Cuadrática, recorre el arreglo por completo otra vez.
function tieneDuplicados(arreglo){
    for (let i = 0; i < arreglo.length; i++) {
        for (let j = 0; j < arreglo.length; j++) {
            if(i!==j && arreglo[i] ===arreglo[j]){
                return true;
            }
        }
        
    }
    return false;
}

function medirTiempo(funcion, arreglo){
    const inicio= performance.now();
    funcion(arreglo);
    const fin= performance.now();
    return(fin-inicio).toFixed(4); //milisegundos
}

function generarArreglo(n){
    return Array.from({length:n},()=> Math.floor(Math.random()*n));
}