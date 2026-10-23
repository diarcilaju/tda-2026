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
    await modelo.fit(x, y, {epochs: 1000, verbose: 0});

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