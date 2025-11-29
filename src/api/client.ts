import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_USUARIOS_URL,
    timeout: 10000,
});

// Interceptar TODAS las peticiones para agregar el token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Manejo global de errores 401 (token expirado o inválido)
api.interceptors.response.use(
    (response) => response,
    (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        alert('Sesión expirada. Por favor inicia sesión nuevamente.');
        window.location.href = '/login';
    }
    return Promise.reject(error);
    }   
);