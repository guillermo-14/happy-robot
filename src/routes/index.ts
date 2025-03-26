import { Router } from 'express';
import { verifyNumber } from '../controllers/fmcsa.js';
import { validateRequest } from '../middlewares/zodValidation.js';
import { verifyNumberSchema } from '../schemas/fmcsaSchemas.js';

const router = Router();

router.get(
    '/verify-carrier', 
    validateRequest(verifyNumberSchema),    
    verifyNumber
);

export default router
