export const getAuthHeaders = () => {
    const token = localStorage.getItem('userAccessToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};
