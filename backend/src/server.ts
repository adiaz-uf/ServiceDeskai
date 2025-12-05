import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import { connectDB } from './config/db';
import router from './routes';

const app: Express = express();
const PORT: number = Number(process.env.BACKEND_PORT);

if (!PORT) {
  console.error('CRITICAL ERROR: BACKEND_PORT environment variable is not defined.');
  process.exit(1);
}

// Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/v1', router);

// Connect database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});