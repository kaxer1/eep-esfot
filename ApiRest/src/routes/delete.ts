import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import { deleteMetodoGeneral } from '../controllers/delete.controller';

const router: Router = Router();

router.delete('/registro', TokenValidation, deleteMetodoGeneral);

export default router;