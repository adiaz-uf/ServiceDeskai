// API Configuration from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost';
const API_PORT = import.meta.env.VITE_BACKEND_PORT || '9000';

export const API_BASE_URL = `${API_URL}:${API_PORT}/api/v1`;
