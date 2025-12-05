import { Schema, model, Document, Types } from 'mongoose';

export interface IReport extends Document {
    description: string;
    office: Types.ObjectId;
    user: Types.ObjectId;
    status: 'open' | 'assigned' | 'in-progress' | 'closed';
    image_url: string;
}