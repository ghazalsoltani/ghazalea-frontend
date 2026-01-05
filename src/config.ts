export const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080/api';
export const API_BASE_URL = API_URL.replace('/api', '');

export const getImageUrl = (illustration: string): string => {
    return `${API_BASE_URL}/uploads/${illustration}`;
};