import { Router } from 'express';
const router: Router = Router();

import * as PROCESO from '../controllers/proceso.controller';
import { TokenValidation } from "../libs/verifyToken";

router.post('/registrar-proceso', TokenValidation, PROCESO.RegistrarProceso);
router.get('/ver-registros', TokenValidation, PROCESO.ObtenerProcesosElectorales);
router.get('/proceso-actual', TokenValidation, PROCESO.infoProcesoToUsuarios);

export default router;