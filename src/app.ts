import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/index.js';
import { requestLogger } from './middlewares/request.js';

const app = express();


app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(requestLogger);
app.use('/api/v1', router)


export default app;
