import { Router } from 'express';
const router: Router = Router();

router.get('/api/', (req, res) => {
    res.send('hello world'); 
});

export default router;