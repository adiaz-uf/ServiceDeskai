import mongoose from 'mongoose';
import { initializeDatabase } from './init-db';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('CRITICAL ERROR: MONGODB_URI environment variable is not defined.');
  process.exit(1);
}

export async function connectDB(): Promise<typeof mongoose> {
  try {
    await mongoose.connect(MONGODB_URI as string);
    
    const dbName = mongoose.connection.db?.databaseName;
    console.log(`Connected to MongoDB database: ${dbName}`);

    // Create collections and insert initial data
    await initializeDatabase();
    
    return mongoose;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}
