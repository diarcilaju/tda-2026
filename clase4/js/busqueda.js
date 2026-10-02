const contactos =[
    'Martha','Carlos','Ana','Luis','Elena',
    'Pedro','Sofía','Diego','Lucía','Jorge'
];

const contactosOrdenados= [...contactos].sort();

function busquedaLineal(contactos, nombreBuscado){
    for (let i = 0; i < contactos.length; i++) {
        if(contactos[i]===nombreBuscado){
            return i;
        }
    }
    return -1;
}

function busquedaBinaria(contactosOrdenados, nombreBuscado){
    let inicio=0;
    let fin= contactosOrdenados.length -1;

    while(inicio<=fin){
        const medio= Math.floor((inicio+fin)/2);
        if(contactosOrdenados[medio]===nombreBuscado) return medio;
        if(contactosOrdenados[medio]<nombreBuscado){
            inicio=medio+1;
        }else{
            fin=medio-1;
        }
    }
    return -1;
}