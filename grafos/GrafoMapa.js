class GrafoMapa{
    constructor(){
        this.adyacencia=new Map();
    }

    agregarLugar(lugar){
        if(!this.adyacencia.has(lugar)){
            this.adyacencia.set(lugar,[]);
        }
    }
    agregarConexion(origen, destino, distanciaEnKm){
        this.agregarLugar(origen);
        this.agregarLugar(destino);
        this.adyacencia.get(origen).push({lugar:destino, distancia: distanciaEnKm});
        this.adyacencia.get(destino).push({lugar:origen, distancia: distanciaEnKm});
    }
    imprimirMapa(){
        for (const [lugar, conexiones] of this.adyacencia) {
            const conexTexto=conexiones
                            .map(c => `${c.lugar} (${c.distancia} km)`)
                            .join(', ');
            console.log(`${lugar} -> ${conexTexto}`);
        }
    }
    obtenerRutaMasCorta(origen, destino){
        const distancias={};
        const previos={};
        const noVisitados=new Set();

        for (let lugar of Array.from(this.adyacencia.keys())) {
            distancias[lugar] = Infinity;
            previos[lugar] = null;
            noVisitados.add(lugar);
        }

        distancias[origen]=0;
        while(noVisitados.size>0){
            let actual=null;
            for (let nodo of noVisitados) {
                if (actual === null || distancias[nodo] < distancias[actual]) {
                    actual = nodo;
                }
            }
            if (distancias[actual] === Infinity || actual === destino) {
                break;
            }

            noVisitados.delete(actual);

            for (let vecino of this.adyacencia.get(actual)) {
                if (noVisitados.has(vecino.lugar)) {
                    const alt = distancias[actual] + vecino.distancia;
                    if (alt < distancias[vecino.lugar]) {
                        distancias[vecino.lugar] = alt;
                        previos[vecino.lugar] = actual;
                    }
                }
            }
        }
        const ruta = [];
        let paso = destino;

        while (paso) {
            ruta.unshift(paso);
            paso = previos[paso];
        }

        return {
            distanciaTotal: distancias[destino], 
            ruta: ruta[0] === origen ? ruta : []
        };
    }
}
export default GrafoMapa;