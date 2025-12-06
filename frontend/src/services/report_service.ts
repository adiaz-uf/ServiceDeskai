import { API_BASE_URL } from '../config/constants';

interface CreateReportData {
    description: string;
    office: string;
    sharedWith?: string;
    image: File;
}

const createReport = async (data: CreateReportData) => {
    const token = localStorage.getItem('userAccessToken');
    
    const formData = new FormData();
    formData.append('description', data.description);
    formData.append('office', data.office);
    formData.append('image', data.image);
    
    if (data.sharedWith) {
        formData.append('sharedWith', data.sharedWith);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/reports`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
                // No Content-Type with formData
            },
            body: formData
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error al crear el reporte');
        }

        return result;
    } catch (err) {
        console.error('Error creating report:', err);
        throw err;
    }
};

const getReportHistory = async () => {
    const token = localStorage.getItem('userAccessToken');

    try {
        const response = await fetch(`${API_BASE_URL}/reports`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error al obtener reportes');
        }

        return result;
    } catch (err) {
        console.error('Error fetching reports:', err);
        throw err;
    }
};

const getReportDetails = async (reportId: string) => {
    const token = localStorage.getItem('userAccessToken');

    try {
        const response = await fetch(`${API_BASE_URL}/reports/${reportId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error al obtener el reporte');
        }

        return result;
    } catch (err) {
        console.error('Error fetching report details:', err);
        throw err;
    }
};

const updateReportStatus = async (reportId: string, status: string) => {
    const token = localStorage.getItem('userAccessToken');

    try {
        const response = await fetch(`${API_BASE_URL}/reports/${reportId}/status`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error al actualizar el estado');
        }

        return result;
    } catch (err) {
        console.error('Error updating report status:', err);
        throw err;
    }
};

export const reportService = {
    createReport,
    getReportHistory,
    getReportDetails,
    updateReportStatus
};