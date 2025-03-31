import { ERRORS } from '@/utils/constants.js';
import logger from '@/utils/logger.js';
import type { Request, Response, NextFunction } from 'express';

const { LOAD_CHECKER_REST_API_KEY } = process.env

const validApiKeys = new Set([LOAD_CHECKER_REST_API_KEY])

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
  const authorization = req.get('Authorization')
  const apiKey = authorization?.split(' ')[1]
  if (!apiKey) {
    logger.error('[MW-AUTH] Unauthorized access attempt detected - No API Key provided');
    res.status(401).json({ 
      status: 401,
      error: ERRORS.INVALID_API_KEY
    }); // we use the same error message for both cases, to avoid leaking information
    return
  }
  if (!validApiKeys.has(apiKey)) {
      logger.error('[MW-AUTH] Unauthorized access attempt detected - Invalid API Key');
      res.status(401).json({ 
        status: 401,
        error: ERRORS.INVALID_API_KEY
      });
      return
  }
  next();
}
