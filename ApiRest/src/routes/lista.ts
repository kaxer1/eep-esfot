import { Router } from 'express';
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";
import { subirImageLista, getAudio, createListas, getListasElectoral} from '../controllers/lista.controller';
import multer from '../libs/multer'

// router.get('/img/:logo', getImageLista);
router.get('/audio', getAudio);
router.get('/lista/:id_proceso', TokenValidation, getListasElectoral);
router.post('/registrar-lista/', TokenValidation, createListas);
router.put('/img-lista/:id_lista', [TokenValidation, multer.single('image')], subirImageLista);

export default router;
