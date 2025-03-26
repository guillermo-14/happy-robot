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
        res.status(400).json({
          success: false,
          message: 'Validation error',
          // errors: error.errors, // Default Zod error format, in case we want to use it
          formattedErrors: error.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        });
      } else {
          res.status(500).json({
            success: false,
            message: 'Internal server error during validation'
          });
      }
    }
  };
};
