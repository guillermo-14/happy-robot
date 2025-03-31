import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from '@/routes/index.js';
import { notFoundHandler } from '@/middlewares/notFound.js';
import { loadData } from './utils/loadData.js';

const app = express();

// Load the data from the csv file into memory
loadData();

// Security configuration
app.use(helmet());
app.use(cors());

// Middleware to parse requests as JSON
app.use(express.json());

// Load API v1 routes
app.use('/api/v1', router);

// Middleware to handle 404 errors
app.use(notFoundHandler);

export default app;
