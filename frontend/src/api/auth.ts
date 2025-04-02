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
    
    // Create user object with correct format
    const user = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      token: userData.token
    };
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    
    // Type guard for axios-like error objects
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const responseError = error as { response?: { data?: { message?: string } } };
      if (responseError.response?.data?.message) {
        throw new Error(responseError.response.data.message);
      }
    }
    
    throw new Error(errorMessage);
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
    
    // Create user object with correct format
    const user = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      token: userData.token
    };
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Registration failed';
    
    // Type guard for axios-like error objects
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const responseError = error as { response?: { data?: { message?: string } } };
      if (responseError.response?.data?.message) {
        throw new Error(responseError.response.data.message);
      }
    }
    
    throw new Error(errorMessage);
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}; 