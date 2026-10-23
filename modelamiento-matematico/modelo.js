//Punto de equilibrio de un negocio
//Cada vaso se vende a S/5.00 soles  preparar uno cuesta S/2.00 soles, 
//y se tiene un gasto fijo de S/300.00 soles.
//Se desea saber cuántos vasos se deben vender para cubrir los gastos fijos y variables.

function calcular(){
    const precio=Number(document.getElementById("precio").value);
    const variable=Number(document.getElementById("variable").value);
    const fijo=Number(document.getElementById("fijo").value);
    const vasos=Number(document.getElementById("vasos").value);

    const utilidad=precio*vasos-(variable*vasos+fijo); //el modelo

    let texto;
    if(precio<=variable){
        texto="No es posible cubrir los gastos fijos y variables, el precio de venta es menor o igual al costo variable.";
    }else{
        const equilibrio=Math.ceil(fijo/(precio-variable));
        texto='Punto de equilibrio:'+equilibrio+' vasos\n' + 'Utilidad vendiendo '+vasos+' vasos: S/'+utilidad;
    }
    document.getElementById('resultado').textContent=texto;
}