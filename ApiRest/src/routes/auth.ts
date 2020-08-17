import { Router } from 'express';
const router: Router = Router();

import { TokenValidation } from '../libs/verifyToken';

import { signin, signup, profile } from '../controllers/auth.controller';

router.post('/singup', signup);
router.post('/singin', signin);


router.get('/profile', TokenValidation, profile);

export default router;