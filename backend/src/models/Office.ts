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
    }
}, {
    timestamps: true
});

// Create the Office Model
export const OfficeModel = model<IOffice>('Office', officeSchema);

/* TODO: insert data in db
  { value: "madrid1", label: "n.1 - Madrid, Calle Cristóbal Bordiú 13"},
  { value: "madrid2", label: "n.2 - Madrid, Plaza Ruiz Picasso 11 Piso 7"},
  { value: "barcelona1", label: "n.3 - Barcelona, Carrer d’Amigó 11"},
  { value: "valencia1", label: "n.4 - Logroño, Calle Fausto Elhuyar 5-7"},
  { value: "valencia2", label: "n.5 - Málaga, Calle Compositor Lehmberg Ruiz 21 Planta 2"},
  { value: "valencia3", label: "n.6 - Málaga, Paseo del Muelle Uno"}, */
