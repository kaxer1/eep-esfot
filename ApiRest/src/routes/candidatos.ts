import { Router } from 'express';
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";
import { getImageCandidatos,createImageCandidato,getAudio} from '../controllers/candidatos.controller';
import multer from '../libs/multer'

router.get('/img/:logo', getImageCandidatos);
router.get('/audio', getAudio);
router.post('/img/', [TokenValidation, multer.single('image')], createImageCandidato);

export default router;
