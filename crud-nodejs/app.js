import express from 'express';
import path from 'path';
import productos from './routes/producto.js';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(import.meta.dirname, 'public')));

app.get('/', (req, res) => res.redirect('/productos'));
app.use('/productos', productos);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send('Error interno del servidor' + error.message);
});

app.listen(3000, () => console.log('Servidor iniciado en http://localhost:3000'));