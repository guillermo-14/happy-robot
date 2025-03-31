import { Router } from 'express';
import { verifyCarrier } from '@/controllers/carriers.js';
import { validateRequest } from '@/middlewares/paramsValidation.js';
import { verifyCarrierId } from '@/schemas/fmcsa.js';

const router = Router();

router.get(
    '/', 
    validateRequest(verifyCarrierId),    
    verifyCarrier
);

export default router
