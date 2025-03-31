import { ERRORS } from '@/utils/constants.js';
import logger from '@/utils/logger.js';
import type { Request, Response, NextFunction } from 'express';
import { ZodError, type AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      next();
    } catch (error) {
      
      if (error instanceof ZodError) {
        logger.warn('[MW-VALIDATION] Validation error', error.errors);
        res.status(400).json({
          status: 400,
          errors: error.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        });
      } else {
        logger.error('[MW-VALIDATION] Unexpected error during validation', error);
        res.status(500).json({
          status: 500,
          error: ERRORS.SCHEMA_VALIDATION_INTERNAL_SERVER_ERROR
        });
      }
    }
  };
};
