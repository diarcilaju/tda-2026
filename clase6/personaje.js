//Ejemplo de mover un personaje con vectores
function sumar(a, b){
    return [a[0]+b[0], a[1]+b[1]];
}

function distancia(a, b){
    return Math.hypot(b[0]-a[0], b[1]-a[1]);
}

let posicion=[0, 0];
const velocidad=[3, 4]; //Avanza 3 en x y 4 en y y cada segundo
for (let segundo=1; segundo<=3; segundo++){
    posicion=sumar(posicion, velocidad);
    console.log(`segundo ${segundo}: posicion ${JSON.stringify(posicion)}`);
}

console.log('Distancia desde el inicio:', distancia([0,0], posicion));