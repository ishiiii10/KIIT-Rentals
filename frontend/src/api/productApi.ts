import api from './axios';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    available: boolean;
    createdAt: string;
    updatedAt: string;
}

interface CreateProductData {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

export const productApi = {
    getAllProducts: async () => {
        const response = await api.get<Product[]>('/products');
        return response.data;
    },

    getProductById: async (id: string) => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },

    createProduct: async (productData: CreateProductData) => {
        const response = await api.post<Product>('/products', productData);
        return response.data;
    },

    updateProduct: async (id: string, productData: Partial<CreateProductData>) => {
        const response = await api.put<Product>(`/products/${id}`, productData);
        return response.data;
    },

    deleteProduct: async (id: string) => {
        const response = await api.delete<{ message: string }>(`/products/${id}`);
        return response.data;
    }
}; 