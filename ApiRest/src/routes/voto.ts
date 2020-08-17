import { Router } from 'express';
const router: Router = Router();

import { registrarVoto, verVotos } from '../controllers/voto.controller';
import { TokenValidation } from "../libs/verifyToken";

router.post('/registrar', TokenValidation, registrarVoto);
router.get('/ver', TokenValidation, verVotos);

export default router;