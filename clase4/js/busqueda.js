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