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
