import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import {connectDB} from './config/db';
import router from './routes';
import { registerUser } from './services/registerService';

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

// Connect database
connectDB().then(() => {

  // start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  const admin_email = process.env.ADMIN_EMAIL;
  const admin_username = process.env.ADMIN_USERNAME;
  const admin_password = process.env.ADMIN_PASSWORD;
  const admin_name = process.env.ADMIN_NAME;

  if (!admin_email || !admin_username || !admin_password || !admin_name) {
    console.error('CRITICAL ERROR: Admin credentials environment variables are not defined.');
    process.exit(1);
  } else {
    try {
      const user = await registerUser({
        email: admin_email,
        password: admin_password,
        username: admin_username,
        name: admin_name,
        userRole: 'admin'
      });
      console.log('Admin user created successfully:', user.email);
    } catch (error) {
      if (error instanceof Error && error.message === 'User already exists') {
        console.log('Admin user already exists, skipping creation.');
      } else {
        console.error('Error creating admin user:', error);
      }
    }
  }
});
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});