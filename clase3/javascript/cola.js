class Cola{
    #almacen=[];
    #frente=0;
    #final=0;

    get size(){
        return this.#final - this.#frente;
    }

    estaVacia(){
        return this.#frente===this.#final;
    }

    encolar(valor){
        this.#almacen[this.#final]=valor;
        this.#final++;
    }

    desencolar(){
        if(this.estaVacia()){
            throw new Error("Error, cola vacía");    
        }
        const valor=this.#almacen[this.#frente];
        delete this.#almacen[this.#frente];
        this.#frente++;
        return valor;
    }
    imprimir(){
        return [this.#almacen];
    }
}