import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include Clerk token if available
api.interceptors.request.use(async (config) => {
    // With Clerk, token management is usually handled server-side or via their hooks, 
    // but if needed here, you can inject it explicitly in your components.
    // For now, we leave the interceptor pass-through to not break existing structure.
    return config;
});

export default api;

export const productsApi = {
    getAll: () => api.get('/products'),
    getById: (id: string) => api.get(`/products/${id}`),
    create: (data: any) => api.post('/products', data),
    update: (id: string, data: any) => api.put(`/products/${id}`, data),
    delete: (id: string) => api.delete(`/products/${id}`),
};



export const contactApi = {
    submit: (data: any) => api.post('/contact', data),
};
