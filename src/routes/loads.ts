import { Router } from 'express';
import { validateRequest } from '@/middlewares/paramsValidation.js';
import { verifyLoadsCriteria } from '@/schemas/loads.js';
import { getLoads } from '@/controllers/loads.js';

const router = Router();

router.get(
    '/', 
    validateRequest(verifyLoadsCriteria),    
    getLoads
)

export default router
