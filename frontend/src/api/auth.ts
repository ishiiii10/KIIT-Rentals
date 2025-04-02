import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await api.post('/user/login', credentials);
    const userData = response.data;

    if (!userData.success) {
      throw new Error(userData.message || 'Login failed');
    }

    // Store token in localStorage
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));

    return userData;
  } catch (error: unknown) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred during login');
  }
};

export const register = async (credentials: RegisterCredentials): Promise<User> => {
  try {
    const response = await api.post('/user/signup', credentials);
    const userData = response.data;

    if (!userData.success) {
      throw new Error(userData.message || 'Registration failed');
    }

    // Store token in localStorage
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));

    return userData;
  } catch (error: unknown) {
    console.error('Registration error:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred during registration');
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}; 