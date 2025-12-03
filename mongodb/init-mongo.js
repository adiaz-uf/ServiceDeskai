// Inicializatión script for MongoDB database

db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

if (!db)
{
    console.error('Error: MONGO_INITDB_DATABASE environment variable is not defined.')
}

// Create collection 'users' if not exists
db.createCollection('users');

db.users.insertOne({
    _id: ObjectId(),
    createdAt: new Date(),
    description: "Example document",
    age: 25,
    username: 'adiaz-uf'
});

print('Database initialized successfully');