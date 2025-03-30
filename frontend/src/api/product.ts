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
    console.log('Creating product with data:', product);
    console.log('Phone field being sent to backend:', product.phone);
    
    const response = await api.post<ApiResponse<Product>>('/products', product);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create product');
    }
    
    console.log('Product created successfully:', response.data.data);
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
    console.log('Updating product with data:', product);
    
    const response = await api.put<ApiResponse<Product>>(`/products/${id}`, product);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update product');
    }
    
    console.log('Product updated successfully:', response.data.data);
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