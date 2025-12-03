import express, { Express, Request, Response } from 'express';

import { TravelRecommendation, FrontendRequest } from './types';

const app: Express = express();
const PORT: number = Number(process.env.BACKEND_PORT);

if (!PORT) {
    console.error('CRITICAL ERROR: BACKEND_PORT environment variable is not defined.');
    process.exit(1);
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});