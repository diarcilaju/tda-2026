import {Router} from 'express';
import * as c from '../controllers/productoController.js';

const router = Router();

router.get('/', c.listar);
router.get('/nuevo', c.fomularioNuevo);
router.post('/', c.crear);
router.get('/:id/editar', c.fomularioEditar);
router.post('/:id/actualizar', c.editar);
router.post('/:id/eliminar', c.eliminar);

export default router;