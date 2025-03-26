import api from './api';
import { ApiResponse } from './auth';

export interface Product {
  _id?: string;
  name: string;
  price: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<ApiResponse<Product[]>>('/products');
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch products');
    }
    
    return response.data.data || [];
  } catch (error: any) {
    console.error('Error fetching products:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const createProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await api.post<ApiResponse<Product>>('/products', product);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create product');
    }
    
    return response.data.data as Product;
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const updateProduct = async (id: string, product: Product): Promise<Product> => {
  try {
    const response = await api.put<ApiResponse<Product>>(`/products/${id}`, product);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update product');
    }
    
    return response.data.data as Product;
  } catch (error: any) {
    console.error('Error updating product:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const response = await api.delete<ApiResponse<void>>(`/products/${id}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete product');
    }
  } catch (error: any) {
    console.error('Error deleting product:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}; 