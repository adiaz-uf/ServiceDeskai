import { Schema, model, Document } from 'mongoose';

// Interface for the Office document properties
export interface IOffice extends Document {
    number: number;
    city: string;
    country: string;
    direction: string;
    createdAt: Date;
    updatedAt: Date;
}

// Office Schema
const officeSchema = new Schema<IOffice>({
    number: {
        type: Number,
        required: true,
        unique: true,
        min: [1, 'Office number must be at least 1'],
        validate: {
            validator: Number.isInteger,
            message: 'Office number must be an integer'
        }
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    direction: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }
}, {
    timestamps: true
});

// Create the Office Model
export const OfficeModel = model<IOffice>('Office', officeSchema);
