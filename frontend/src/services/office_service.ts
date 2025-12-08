import { API_BASE_URL } from '../config/constants';
import { getAuthHeaders } from '../config/headers';

export interface Office {
    _id: string;
    number: number;
    city: string;
    country: string;
    direction: string;
}

export interface CreateOfficeData {
    city: string;
    country: string;
    direction: string;
}

const getAllOffices = async (): Promise<Office[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/offices`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error al obtener oficinas');
        }

        return result.offices;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const createOffice = async (data: CreateOfficeData): Promise<Office> => {
    try {
        const response = await fetch(`${API_BASE_URL}/offices`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error al crear oficina');
        }

        return result.office;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const officeService = {
    getAllOffices,
    createOffice
};
