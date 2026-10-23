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