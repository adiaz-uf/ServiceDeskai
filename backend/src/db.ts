import { MongoClient, Db, CollectionInfo } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('CRITICAL ERROR: MONGODB_URI environment variable is not defined.');
  process.exit(1);
}

let client: MongoClient;
let db: Db;

export async function connectDB(): Promise<Db> {
  if (db) return db;

  try {
    client = new MongoClient(MONGODB_URI as string);
    await client.connect();
    
    // Extract db name from URI
    const dbName = new URL(MONGODB_URI as string).pathname.slice(1).split('?')[0];

    if (!dbName) {
      throw new Error('Database name could not be determined from MONGODB_URI.');
    }   

    db = client.db(dbName);
    
    console.log(`Connected to MongoDB database: ${dbName}`);

    // Initialize collections if they do not exist
    await initializeCollections();
    
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

async function initializeCollections(): Promise<void> {
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((c: CollectionInfo) => c.name);

  // Create collection 'users' if not exists
  if (!collectionNames.includes('users')) {
    await db.createCollection('users');
    console.log('Created collection: users');

    // Insert admin user
    await db.collection('users').insertOne({
      createdAt: new Date(),
      description: 'Admin user',
      name: 'Administrator',
      username: 'admin'
    });
    console.log('Inserted example user document');
  }

  // Create collection 'reports' if not exists
  if (!collectionNames.includes('reports')) {
    await db.createCollection('reports');
    console.log('Created collection: reports');
  }
}

export async function disconnectDB(): Promise<void> {
  if (client) {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

export function getDB(): Db {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return db;
}
