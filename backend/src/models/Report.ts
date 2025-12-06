import { Schema, model, Document, Types } from 'mongoose';

export interface IReport extends Document {
    description?: string;
    office: Types.ObjectId;
    user: Types.ObjectId;
    status: 'open' | 'assigned' | 'in-progress' | 'closed';
    image_url: string;
    sharedWith?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Report Schema
const reportSchema = new Schema<IReport>({
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: 'Office',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'assigned', 'in-progress', 'closed'],
        default: 'open',
    },
    image_url: {
        type: String,
        required: true,
    },
    sharedWith: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});

// Create the Report Model
export const ReportModel = model<IReport>('Report', reportSchema);