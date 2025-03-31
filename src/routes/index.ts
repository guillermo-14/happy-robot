import { Router } from 'express';
import carriersRouter from '@/routes/carriers.js';
import loadsRouter from '@/routes/loads.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '@/utils/swagger.json' with { type: 'json' };
import { requestLogger } from '@/middlewares/request.js';
import { checkApiKey } from '@/middlewares/auth.js';

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware to log requests
router.use(requestLogger)

// Middleware to check API key
router.use(checkApiKey)

// Import individual routers
router.use('/carriers', carriersRouter);
router.use('/loads', loadsRouter);

export default router
