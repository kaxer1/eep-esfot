import { Router } from 'express';
const router: Router = Router();

import { obtenerMenu, obtenerTransaccion, obtenerRol, mantenimientoMenu, mantenimientoTransaccion, mantenimientoRol } from '../controllers/seguridad.controller';
import { TokenValidation } from "../libs/verifyToken";

router.post('/menu', TokenValidation, mantenimientoMenu);
router.get('/menu', TokenValidation, obtenerMenu);
router.post('/transaccion', TokenValidation, mantenimientoTransaccion);
router.get('/transaccion', TokenValidation, obtenerTransaccion);
router.post('/rol', TokenValidation, mantenimientoRol);
router.get('/rol', TokenValidation, obtenerRol);

export default router;