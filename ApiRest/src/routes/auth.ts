import { Router } from 'express';
const router: Router = Router();

import { TokenValidation } from '../libs/verifyToken';

import { consultarMenu, signin, EnviarEmailCambioPassword, actualizarPassword } from '../controllers/auth.controller';

router.post('/signin', signin);
router.post('/email', EnviarEmailCambioPassword);
router.post('/recuperar', TokenValidation, actualizarPassword);
router.get('/menu', TokenValidation, consultarMenu);

export default router;