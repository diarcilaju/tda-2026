import GrafoMapa from './GrafoMapa.js';

const mapa=new GrafoMapa();
//Crear las conexiones del mapa
mapa.agregarConexion('Chiclayo','Monsefú',14);
mapa.agregarConexion('Chiclayo', 'Lambayeque', 12);
mapa.agregarConexion('Chiclayo', 'Pomalca', 6);
mapa.agregarConexion('Pomalca', 'Tumán',8);
mapa.agregarConexion('Tumán','Pátapo',6);
mapa.agregarConexion('Chiclayo','Pimentel', 10);
mapa.agregarConexion('Pimentel','Monsefú',8 );

//Ver la estructura del mapa
console.log("===Estructura del Mapa===");
mapa.imprimirMapa();

//Calcular la ruta más corta
console.log("===Cálculo de la ruta más corta===");
const resultado=mapa.obtenerRutaMasCorta('Chiclayo','Pomalca');
console.log(`Ruta óptima: ${resultado.ruta.join('->')}`);
console.log(`Distancia total: ${resultado.distanciaTotal} km`);