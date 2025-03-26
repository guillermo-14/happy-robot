import type { Request, Response, NextFunction } from 'express';

export async function requestLogger(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(`[${new Date().toISOString()}] [${req.method}] ${req.url}`);
    console.log('Solicitud recibida:', {
        method: req.method,
        url: req.url,
        headers: {
          'content-length': req.headers['content-length'],
          'content-type': req.headers['content-type'],
          'user-agent': req.headers['user-agent'],
        },
        ip: req.ip
      });
    
    next();
}