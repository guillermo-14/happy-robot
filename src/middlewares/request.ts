import type { Request, Response, NextFunction } from 'express';

export async function requestLogger(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(`[${new Date().toISOString()}] [${req.method}] ${req.url}`);
    next();
}