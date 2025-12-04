import mongoose from 'mongoose';

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

    // Initialize collections if they do not exist
    await initializeCollections();
    
    return mongoose;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

async function initializeCollections(): Promise<void> {
  const db = mongoose.connection.db;
  if (!db) return;

  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((c: { name: string }) => c.name);

  // Create collection 'users' if not exists
  if (!collectionNames.includes('users')) {
    await db.createCollection('users');
    console.log('Created collection: users');
  }

  // Create collection 'reports' if not exists
  if (!collectionNames.includes('reports')) {
    await db.createCollection('reports');
    console.log('Created collection: reports');
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}
