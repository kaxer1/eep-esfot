import { getListasEstudiante, updateEstudiante, createEstudiante } from '../controllers/estudiante.controller';
import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
const router: Router = Router();

router.get('/lista', TokenValidation, getListasEstudiante);
router.post('/registrar', TokenValidation, createEstudiante);
router.put('/update', TokenValidation, updateEstudiante);

export default router;