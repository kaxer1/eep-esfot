import { getListasEstudiante, postRegistroEstudiante } from '../controllers/estudiante.controller';
import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
const router: Router = Router();


// router.post('/registrar', TokenValidation, registrarVoto);
// router.get('/ver', TokenValidation, verVotos);
router.get('/lista', TokenValidation, getListasEstudiante);
router.post('/registra', TokenValidation, postRegistroEstudiante);

export default router;