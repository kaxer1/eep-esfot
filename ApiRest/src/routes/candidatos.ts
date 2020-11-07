import { Router } from 'express';
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";
import { getListaCandidatos, createCandidatos} from '../controllers/candidatos.controller';

router.get('/lista-candidatos/:id_lista', TokenValidation, getListaCandidatos);
router.post('/registrar-candidato/', TokenValidation, createCandidatos);
// router.put('/img-lista/:id_lista', TokenValidation, subirImageLista);

export default router;