import Grafo from './Grafo.js';

const mapa = new Grafo();

// Distancias aproximadas por carretera, en kilómetros.
[
    ['Chiclayo', 'Lambayeque', 12],
    ['Chiclayo', 'Pimentel', 13],
    ['Chiclayo', 'Monsefú', 16],
    ['Chiclayo', 'Reque', 11],
    ['Chiclayo', 'Pomalca', 8],
    ['Chiclayo', 'Ferreñafe', 18],
    ['Lambayeque', 'Ferreñafe', 18],
    ['Monsefú', 'Eten', 10],
    ['Eten', 'Reque', 8],
    ['Pomalca', 'Tumán', 18],
    ['Tumán', 'Pátapo', 12]
].forEach(([origen, destino, distancia]) => mapa.agregarConexion(origen, destino, distancia));

const origen = document.querySelector('#origen');
const destino = document.querySelector('#destino');
const resultado = document.querySelector('#resultado');
const conexiones = document.querySelector('#conexiones');

// Llena los selectores y muestra cada conexión una sola vez.
for (const lugar of mapa.obtenerLugares()) {
    origen.add(new Option(lugar, lugar));
    destino.add(new Option(lugar, lugar));
}

for (const conexion of mapa.obtenerConexiones()) {
    const item = document.createElement('li');
    item.textContent = `${conexion.origen} — ${conexion.destino}: ${conexion.distancia} km`;
    conexiones.append(item);
}

document.querySelector('#calcular').addEventListener('click', () => {
    if (origen.value === destino.value) {
        resultado.textContent = 'Elige dos ciudades diferentes.';
        return;
    }

    const ruta = mapa.obtenerRutaMasCorta(origen.value, destino.value);
    resultado.textContent = ruta
        ? `${ruta.ruta.join(' → ')} | ${ruta.distanciaTotal} km`
        : 'No hay una ruta entre estas ciudades.';
});