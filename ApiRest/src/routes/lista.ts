import { Router } from 'express';
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";
import { subirImageLista, createListas, getListasElectoral, actualizarListas} from '../controllers/lista.controller';

router.get('/lista/:id_proceso', TokenValidation, getListasElectoral);
router.post('/registrar-lista/', TokenValidation, createListas);
router.put('/update-lista/', TokenValidation, actualizarListas);
router.put('/img-lista/:id_lista', [TokenValidation], subirImageLista);

export default router;
