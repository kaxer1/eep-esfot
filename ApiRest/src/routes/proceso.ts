import { Router } from 'express';
const router: Router = Router();

import { RegistrarProceso, ObtenerProcesosElectorales } from '../controllers/proceso.controller';
import { TokenValidation } from "../libs/verifyToken";

router.post('/registrar-proceso', TokenValidation, RegistrarProceso);
router.get('/ver-registros', TokenValidation, ObtenerProcesosElectorales);

export default router;