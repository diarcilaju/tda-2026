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
Ejemplo de mover un personaje
```javascript
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
```
## TensorFlow
```javascript
/*
En la programación tradicional usamos variables, arreglos u objetos.
En TensorFlow todo se convierte en un tensor

Un tensor es simplemente una estructura matemática (como una matriz)
optimizada para que tu procesador (cpu) o tajeta grática (gpu) realice
miles de cálculos por segundo de forma simúltanea. 

*/
import * as tf from '@tensorflow/tfjs';

async function ejemploSencillo(){
    console.log("Ejemplo sencillo de TensorFlow.js");
    //1. Datos de entrada x
    const x=tf.tensor2d([1,2,3,4],[4,1]);
    //Datos resultantes y
    const y=tf.tensor2d([2,4,6,8],[4,1]);


    //2. Crear una red neuronal con una sóla neurona
    const modelo= tf.sequential();
    modelo.add(tf.layers.dense({units:1, inputShape: [1]}));

    //3. Configurar cómo va a aprender
    modelo.compile({optimizer: 'sgd', loss:'meanSquaredError'});
    console.log("Entrenando a la neurona (dará 200 vueltas)...");
    //Entrenamos el modelo repitiendo los datos 200 veces (epochs)
    await modelo.fit(x, y, {epochs: 200, verbose: 0});

    console.log("Entrenamiento terminado");

    //4. Hacer la predicción
    const numPregunta=5;
    const entrada=tf.tensor2d([numPregunta], [1,1]);
    const prediccion= modelo.predict(entrada);

    //Mostramos el resultado por consola
    console.log(`Si la entrada es ${numPregunta}, la IA predice que el resultado es:`);
    prediccion.print();
}

ejemploSencillo();
```
Predicción del precio de alquiler de una casa según su número de habitaciones
```javascript
import * as tf from '@tensorflow/tfjs'

//1. Datos de entrenamiento (x= número de habitaciones, y= precio de alquiler en soles)
const habitaciones=[1,2,3,4,5,6];
const precios=[250, 350, 500, 600, 800, 1000];

const xs=tf.tensor2d(habitaciones, [6,1]);
const ys=tf.tensor2d(precios, [6,1]);

//2. Modelo secuencial simple (una sola capa densa:precio=w*habitaciones+b)
const modelo=tf.sequential();
modelo.add(tf.layers.dense({units:1, inputShape:[1]}));

//3. Compilar: optimizador y función de pérdida
modelo.compile({optimizer: 'sgd', loss:'meanSquaredError'});

//4.  Entrenar
await modelo.fit(xs, ys, {epochs:500, verbose:0});
console.log("Entrenamiento terminado");

//5. Predecir para nuevos alquileres
for (const hab of [3,7,8]){
    const resultado= modelo.predict(tf.tensor2d([hab], [1, 1]));
    const precio=(await resultado.data())[0];
    console.log(`Cade de ${hab} habitaciones: ~ S/ ${precio.toFixed(0)} soles`);
}
```
