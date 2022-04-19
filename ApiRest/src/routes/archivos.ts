import { updateArchivo } from '../controllers/archivos.controller';
import { TokenValidation } from '../libs/verifyToken';
import { Router } from 'express';
const router: Router = Router();

router.post('/updatefile', [TokenValidation], updateArchivo);

export default router;