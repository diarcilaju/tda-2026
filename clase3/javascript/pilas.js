class Pila{
    //Campo privado, sólo accesible desde la misma clase
    #elementos=[];

    estaVacia(){
        return this.#elementos.length===0;
    }

    verTope(){
        return this.#elementos[this.#elementos.length-1];
    }

    get size(){
        return this.#elementos.length;
    }

    apilar(valor){
        this.#elementos.push(valor);
    }

    desapilar(){
        if(this.estaVacia()){
            throw new Error('No se puede desapilar, la pila esta vacía');
        }else{
            return this.#elementos.pop();
        }
    }
    
    imprimir(){
        return [this.#elementos];
    }
}