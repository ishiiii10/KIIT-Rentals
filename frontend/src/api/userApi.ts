import api from './axios';

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const userApi = {
    login: async (loginData: LoginData) => {
        const response = await api.post('/user/login', loginData);
        return response.data;
    },

    register: async (registerData: RegisterData) => {
        const response = await api.post('/user/register', registerData);
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/user/logout');
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/user/me');
        return response.data;
    }
}; 