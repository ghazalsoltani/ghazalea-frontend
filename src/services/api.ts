import {Product, Category } from '../types';

const API_URL = 'http://localhost:8080/api';

export const api = {
    async getProducts(): Promise<Product[]> {

        const response = await fetch(`${API_URL}/products`);

        const data = await response.json();

        return data.member || data['hydra:member'] || [];

    },

    async getProduct(id: number): Promise<Product> {
        const response = await fetch(`${API_URL}/products/${id}`);
        return response.json();
    },

    async getCategories(): Promise<Category[]> {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        return data.member || data['hydra:member'] || [];

    },
};