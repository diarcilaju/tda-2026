import GrafoMapa from './GrafoMapa.js';

const mapa=new GrafoMapa();
//Crear las conexiones del mapa
mapa.agregarConexion('Chiclayo','Monsefú',14);
mapa.agregarConexion('Chiclayo', 'Lamayeque', 12);
mapa.agregarConexion('Chiclayo', 'Pomalca', 6);
mapa.agregarConexion('Pomalca', 'Tumán',8);
mapa.agregarConexion('Tumán','Pátapo',6);
mapa.agregarConexion('Chiclayo','Pimentel', 10);
mapa.agregarConexion('Pimentel','Monsefú',8 );

//Ver la estructura del mapa
console.log("===Estructura del Mapa===");
mapa.imprimirMapa();