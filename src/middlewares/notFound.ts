import logger from '@/utils/logger.js';
import type { Request, Response } from 'express';

export function notFoundHandler(req: Request, res: Response) {
  logger.error(`[MW-NOT FOUND] Route ${req.url} not found`);
  res.status(404).json({
    status: 404,
    error: `Route ${req.url} not found`,
  });
}