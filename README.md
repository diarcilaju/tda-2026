# Trabajando en Nodejs
## Creando el proyecto
Vamos a crear el proyecto

```bash
npm init -y
```
Si ahora queremos trabajar con la sintaxis moderna ES Modules. Abrimos el archivo package.json y añadimos la propiedad type:

```javascript
"name": "clase6",
  "version": "1.0.0",
  "description": "",
  "type":"module",
  "main": "index.js",
```

Ahora agregamos una clase Calculadora.

```javascript
class Calculadora{
    sumar(a, b){
        return a+b;
    }

    restar(a, b){
        return a-b;
    }

    multiplicar(a, b){
        return a*b;
    }

    dividir(a, b){
        if(b===0){
            return "Error";
        }
        return a/b;
    }
}
export default Calculadora;
```
Ahora en el index utilizamos los métodos de la calculadora.

```javascript
//Importación moderna
import Calculadora from './Calculadora.js'

console.log("Proyecto con ES Modules(import/export) --\n")

const miCalculadora= new Calculadora();

const n1=20;
const n2=5;

//Alt + 96
console.log(`Suma ${miCalculadora.sumar(n1, n2)}`);
console.log(`Resta ${miCalculadora.restar(n1, n2)}`);
console.log(`Multiplicación ${miCalculadora.multiplicar(n1, n2)}`);
console.log(`División ${miCalculadora.dividir(n1, n2)}`);
```

Agregamos la librería Tensorflow.js
```bash
npm install @tensorflow/tfjs
```

