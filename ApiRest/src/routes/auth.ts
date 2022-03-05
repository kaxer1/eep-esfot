import { Router } from 'express';
const router: Router = Router();

import { TokenValidation } from '../libs/verifyToken';

import { consultarMenu, signin } from '../controllers/auth.controller';

router.post('/signin', signin);
router.get('/menu', TokenValidation, consultarMenu);

export default router;