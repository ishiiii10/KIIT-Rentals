import api from './api';
import { ApiResponse } from './auth';

export interface Product {
  _id?: string;
  name: string;
  price: number;
  image: string;
  type: 'sale' | 'rent';
  category: 'books' | 'vehicles' | 'snacks' | 'clothing';
  phone: string;
  address?: string;
  deadline?: string;
  expiry?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<ApiResponse<Product[]>>('/products');
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch products');
    }
    
    const products = response.data.data || [];
    console.log('Products fetched successfully:', products);
    
    // Check each product for phone number
    products.forEach((product, index) => {
      console.log(`Product ${index} (${product._id}) - Phone: ${product.phone}, Type: ${product.type}`);
    });
    
    return products;
  } catch (error: unknown) {
    console.error('Error fetching products:', error);
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const serverError = error as { response?: { data?: { message?: string } } };
      if (serverError.response?.data?.message) {
        throw new Error(serverError.response.data.message);
      }
    }
    throw error instanceof Error ? error : new Error('Failed to fetch products');
  }
};

export const createProduct = async (product: Product): Promise<Product> => {
  try {
    console.log('Creating product with data:', product);
    console.log('Phone field being sent to backend:', product.phone);
    
    // Ensure we have a token
    const token = localStorage.getItem('token');
    console.log('Auth token found:', Boolean(token));
    if (!token) {
      throw new Error('Authentication required. Please log in.');
    }
    
    // Debug API configuration
    console.log('API baseURL:', api.defaults.baseURL);
    console.log('Making POST request to:', `${api.defaults.baseURL}/products`);
    
    // Debug headers that will be sent
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    console.log('Headers being sent:', headers);
    
    try {
      const response = await api.post<ApiResponse<Product>>('/products', product);
      console.log('Raw API response:', response);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to create product');
      }
      
      console.log('Product created successfully:', response.data.data);
      return response.data.data as Product;
    } catch (apiError) {
      console.error('API call error details:', apiError);
      throw apiError;
    }
  } catch (error: unknown) {
    console.error('Error creating product:', error);
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const serverError = error as { response?: { data?: { message?: string } } };
      if (serverError.response?.data?.message) {
        throw new Error(serverError.response.data.message);
      }
    }
    throw error instanceof Error ? error : new Error('Failed to create product');
  }
};

export const updateProduct = async (id: string, product: Product): Promise<Product> => {
  try {
    console.log('Updating product with data:', product);
    
    const response = await api.put<ApiResponse<Product>>(`/products/${id}`, product);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update product');
    }
    
    console.log('Product updated successfully:', response.data.data);
    return response.data.data as Product;
  } catch (error: unknown) {
    console.error('Error updating product:', error);
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const serverError = error as { response?: { data?: { message?: string } } };
      if (serverError.response?.data?.message) {
        throw new Error(serverError.response.data.message);
      }
    }
    throw error instanceof Error ? error : new Error('Failed to update product');
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const response = await api.delete<ApiResponse<void>>(`/products/${id}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete product');
    }
  } catch (error: unknown) {
    console.error('Error deleting product:', error);
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const serverError = error as { response?: { data?: { message?: string } } };
      if (serverError.response?.data?.message) {
        throw new Error(serverError.response.data.message);
      }
    }
    throw error instanceof Error ? error : new Error('Failed to delete product');
  }
}; 