import { Router } from 'express';
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";
import { getListaCandidatos, createCandidato, updateCandidato } from '../controllers/candidatos.controller';

router.get('/lista/:id_lista', TokenValidation, getListaCandidatos);
router.post('/registrar', TokenValidation, createCandidato);
router.put('/editar', TokenValidation, updateCandidato);
// router.put('/img-lista/:id_lista', TokenValidation, subirImageLista);

export default router;