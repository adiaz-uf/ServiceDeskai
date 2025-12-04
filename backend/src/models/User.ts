import { Schema, model, Document } from 'mongoose';

// Interface for the User document properties
// This is what will be returned from the database
export interface IUser extends Document {
    email: string;
    passwordHash: string;
    username: string;
    name: string;
    userRole: 'admin' | 'user' | 'service_desk';
    createdAt: Date;
    updatedAt: Date;
}

// Define the User Schema
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no two users share the same email
        lowercase: true,
        trim: true,
    },
    passwordHash: { // Store the hashed password, NOT the plain text one
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    userRole: {
        type: String,
        enum: ['admin' , 'user' , 'service_desk'],
        default: 'user',
        lowercase: true,
        trim: true,
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create the User Model
export const UserModel = model<IUser>('User', userSchema);