export default class Grafo {
    constructor() {
        this.adyacencia = new Map();
    }

    agregarConexion(origen, destino, distancia) {
        if (!this.adyacencia.has(origen)) this.adyacencia.set(origen, []);
        if (!this.adyacencia.has(destino)) this.adyacencia.set(destino, []);
        this.adyacencia.get(origen).push({ lugar: destino, distancia });
        this.adyacencia.get(destino).push({ lugar: origen, distancia });
    }

    obtenerLugares() {
        return [...this.adyacencia.keys()].sort((a, b) => a.localeCompare(b));
    }

    obtenerConexiones() {
        const conexiones = [];
        for (const [origen, vecinos] of this.adyacencia) {
            for (const vecino of vecinos) {
                if (origen.localeCompare(vecino.lugar) < 0) {
                    conexiones.push({ origen, destino: vecino.lugar, distancia: vecino.distancia });
                }
            }
        }
        return conexiones;
    }

    obtenerRutaMasCorta(origen, destino) {
        if (!this.adyacencia.has(origen) || !this.adyacencia.has(destino)) return null;

        const distancias = new Map(this.obtenerLugares().map(lugar => [lugar, Infinity]));
        const previos = new Map();
        const pendientes = new Set(distancias.keys());
        distancias.set(origen, 0);

        while (pendientes.size) {
            let actual = null;
            for (const lugar of pendientes) {
                if (actual === null || distancias.get(lugar) < distancias.get(actual)) actual = lugar;
            }
            if (distancias.get(actual) === Infinity) break;
            pendientes.delete(actual);
            if (actual === destino) break;

            for (const vecino of this.adyacencia.get(actual)) {
                const nuevaDistancia = distancias.get(actual) + vecino.distancia;
                if (pendientes.has(vecino.lugar) && nuevaDistancia < distancias.get(vecino.lugar)) {
                    distancias.set(vecino.lugar, nuevaDistancia);
                    previos.set(vecino.lugar, actual);
                }
            }
        }

        if (distancias.get(destino) === Infinity) return null;
        const ruta = [destino];
        while (ruta[0] !== origen) ruta.unshift(previos.get(ruta[0]));
        return { ruta, distanciaTotal: distancias.get(destino) };
    }
}