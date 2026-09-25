class ColaSimple {
    #elementos=[];

    encolar(valor){
        this.#elementos.push(valor);
    }

    desencolar(){
        return this.#elementos.shift();
    }

    imprimir(){
        return [this.#elementos];
    }
}