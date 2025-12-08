const getUserCity = async (): Promise<string> => {
    try {
        const response = await fetch('http://ip-api.com/json/');
        
        if (!response.ok) {
            throw new Error('Error al conectar con servicio de IP');
        }

        const data = await response.json();
        
        if (data.status === 'fail') {
            return 'Ubicación desconocida';
        }
        
        return data.regionName; 
    } catch (error) {
        console.error('Error obteniendo ubicación:', error);
        return 'Ubicación desconocida';
    }
};

export const locationService = {
    getUserCity
}