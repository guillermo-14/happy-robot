import logger from '@/utils/logger.js';
import type { Request, Response, NextFunction } from 'express';

export async function requestLogger(req: Request, res: Response, next: NextFunction): Promise<void> {
  const start = Date.now()
  logger.http(`${req.method} ${req.originalUrl}`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.http(`${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`);
  });

  next();
}