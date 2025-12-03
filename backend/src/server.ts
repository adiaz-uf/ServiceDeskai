import express, { Express, Request, Response } from 'express';

import { TravelRecommendation, FrontendRequest } from './types';
import { connectDB } from './db';

const app: Express = express();
const PORT: number = Number(process.env.BACKEND_PORT);

if (!PORT) {
    console.error('CRITICAL ERROR: BACKEND_PORT environment variable is not defined.');
    process.exit(1);
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Connect database
connectDB().then(() => {

  // start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});