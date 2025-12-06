import mongoose from 'mongoose';
import { registerUser } from '../services/registerService';
import { OfficeModel } from '../models/Office';

// Offices
const initialOffices = [
    { number: 1, city: 'Madrid', country: 'España', direction: 'Calle Cristóbal Bordiú 13' },
    { number: 2, city: 'Madrid', country: 'España', direction: 'Plaza Ruiz Picasso 11 Piso 7' },
    { number: 3, city: 'Barcelona', country: 'España', direction: "Carrer d'Amigó 11" },
    { number: 4, city: 'Logroño', country: 'España', direction: 'Calle Fausto Elhuyar 5-7' },
    { number: 5, city: 'Málaga', country: 'España', direction: 'Calle Compositor Lehmberg Ruiz 21 Planta 2' },
    { number: 6, city: 'Málaga', country: 'España', direction: 'Paseo del Muelle 1' },
];

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

    // Create collection 'offices' if not exists
    if (!collectionNames.includes('offices')) {
        await db.createCollection('offices');
        console.log('Created collection: offices');
    }

    // Create collection 'reports' if not exists
    if (!collectionNames.includes('reports')) {
        await db.createCollection('reports');
        console.log('Created collection: reports');
    }
}

// Create admin if not exists
async function createAdminUser(): Promise<void> {
    const admin_email = process.env.ADMIN_EMAIL;
    const admin_username = process.env.ADMIN_USERNAME;
    const admin_password = process.env.ADMIN_PASSWORD;
    const admin_name = process.env.ADMIN_NAME;

    if (!admin_email || !admin_username || !admin_password || !admin_name) {
        console.error('CRITICAL ERROR: Admin credentials environment variables are not defined.');
        process.exit(1);
    }

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
        if (error instanceof Error && 
            (error.message === 'Este email ya existe' || error.message === 'Este nombre de usuario ya existe')) {
            console.log('Admin user already exists, skipping creation.');
        } else {
            console.error('Error creating admin user:', error);
        }
    }
}

// Insert initial offices
async function seedOffices(): Promise<void> {
    try {
        for (const office of initialOffices) {
            const existingOffice = await OfficeModel.findOne({ number: office.number });
            if (!existingOffice) {
                await OfficeModel.create(office);
                console.log(`Office ${office.number} (${office.city}) created successfully.`);
            }
        }
        console.log('Offices seeding completed.');
    } catch (error) {
        console.error('Error seeding offices:', error);
    }
}

export async function initializeDatabase(): Promise<void> {
    await initializeCollections();
    await createAdminUser();
    await seedOffices();
}
