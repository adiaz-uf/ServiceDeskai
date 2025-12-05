import { Schema, model, Document, Types } from 'mongoose';

// Interface for the User document properties
// This is what will be returned from the database
export interface IUser extends Document {
    email: string;
    passwordHash: string;
    username: string;
    name: string;
    userRole: 'admin' | 'user' | 'service_desk';
    office: Types.ObjectId;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}

// User Schema
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    passwordHash: { // Store the hashed password
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
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: 'Office',
    },
    refreshToken: {
        type: String,
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create the User Model
export const UserModel = model<IUser>('User', userSchema);