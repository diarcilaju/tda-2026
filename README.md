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
