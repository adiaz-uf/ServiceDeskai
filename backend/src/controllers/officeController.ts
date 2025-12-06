import { Request, Response } from 'express';
import { getAllOffices, createOffice } from '../services/officeService';

export const getAllOfficesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const allOffices = await getAllOffices();

        res.status(200).json({
            message: 'Oficinas obtenidas correctamente.',
            offices: allOffices
        });
    } catch (error) {
        console.error('Error getting offices:', error);
        res.status(500).json({
            message: 'Error del servidor al obtener las oficinas.'
        });
    }
}

export const createOfficeController = async (req: Request, res: Response): Promise<void> => {
    const { city, country, direction } = req.body;

    try {
        const newOffice = await createOffice({ city, country, direction });

        res.status(201).json({
            message: 'Oficina creada correctamente.',
            office: newOffice
        });
    } catch (error) {
        const err = error as Error;

        if (err.message === 'Esta oficina ya existe') {
            res.status(409).json({
                message: err.message
            });
            return;
        }

        console.error('Error creating office:', error);
        res.status(500).json({
            message: 'Error del servidor al crear la oficina.'
        });
    }
}