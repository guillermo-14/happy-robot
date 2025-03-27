import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import type { Request as ExpressRequest, Response, NextFunction } from 'express';
import router from './routes/index.js';
import { requestLogger } from './middlewares/request.js';
import 'dotenv/config'

// Extender el tipo Request para incluir rawBody
interface Request extends ExpressRequest {
  rawBody?: Buffer;
}

// Extender Error para incluir propiedades que Express puede añadir
interface SyntaxErrorWithStatus extends SyntaxError {
  status?: number;
  body?: any;
}

const app = express();

// Configuración de seguridad
app.use(helmet());
app.use(cors());

// Configuración de parsers con límites aumentados
app.use(express.json({ 
  limit: '50mb',
  verify: (req: Request, res: Response, buf: Buffer) => {
    req.rawBody = buf;
  }
}));

app.use(express.urlencoded({ 
  extended: true, 
  limit: '50mb' 
}));

// Middleware de logging
app.use(requestLogger);

// Rutas de la API
app.use('/api/v1', router);

// Middleware para manejar errores de parsing (DESPUÉS de las rutas)
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError) {
    const syntaxErr = err as SyntaxErrorWithStatus;
    if (syntaxErr.status === 400 && 'body' in syntaxErr) {
      console.error('Error en el parsing de la solicitud:', err);
        res.status(400).json({ 
        success: false, 
        error: 'Error en la solicitud: formato o tamaño inválido' 
      });
    }
  }
  next(err);
});

// Middleware para manejar rutas no encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

export default app;
