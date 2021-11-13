import { Router } from 'express';
const router: Router = Router();

import { TokenValidation } from '../libs/verifyToken';

import { signin } from '../controllers/auth.controller';

router.post('/signin', signin);

export default router;