import { Product, Category, Address, AddressFormData, Carrier, Order } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080/api';

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};

export const api = {
    // PRODUCTS & CATEGORIES
    async getProducts(): Promise<Product[]> {
        const response = await fetch(`${API_URL}/products?itemsPerPage=100`);
        const data = await response.json();
        return data.member || data['hydra:member'] || data || [];
    },

    async getProduct(id: number): Promise<Product> {
        const response = await fetch(`${API_URL}/products/${id}`);
        return response.json();
    },

    async getCategories(): Promise<Category[]> {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        return data.member || data['hydra:member'] || data || [];
    },

    // ADDRESSES
    async getAddresses(): Promise<Address[]> {
        const response = await fetch(`${API_URL}/user/addresses`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch addresses');
        return response.json();
    },

    async createAddress(addressData: AddressFormData): Promise<Address> {
        const response = await fetch(`${API_URL}/user/addresses`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(addressData),
        });
        if (!response.ok) throw new Error('Failed to create address');
        return response.json();
    },

    async deleteAddress(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/user/addresses/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to delete address');
    },

    // CARRIERS
    async getCarriers(): Promise<Carrier[]> {
        const response = await fetch(`${API_URL}/carriers`);
        if (!response.ok) throw new Error('Failed to fetch carriers');
        return response.json();
    },

    // ORDERS
    async createOrder(data: {
        addressId: number;
        carrierId: number;
        items: { productId: number; quantity: number }[];
    }): Promise<{ success: boolean; orderId: number; total: number; reference: string }> {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create order');
        return response.json();
    },

    async getOrders(): Promise<Order[]> {
        const response = await fetch(`${API_URL}/orders`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        return response.json();
    },

    async getOrder(id: number): Promise<Order> {
        const response = await fetch(`${API_URL}/orders/${id}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch order');
        return response.json();
    },

    // STRIPE CHECKOUT
    async createCheckoutSession(data: {
        addressId: number;
        carrierId: number;
        items: { productId: number; quantity: number }[];
    }): Promise<{ success: boolean; checkoutUrl: string; sessionId: string; orderId: number }> {
        const response = await fetch(`${API_URL}/checkout/create-session`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create checkout session');
        }
        return response.json();
    },

    async verifyPayment(sessionId: string): Promise<{ success: boolean; paid: boolean; orderId?: number }> {
        const response = await fetch(`${API_URL}/checkout/verify/${sessionId}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to verify payment');
        return response.json();
    },
    // WISHLIST
    async getWishlist(): Promise<Product[]> {
        const response = await fetch(`${API_URL}/wishlist`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch wishlist');
        return response.json();
    },

    async addToWishlist(productId: number): Promise<{ success: boolean; inWishlist: boolean }> {
        const response = await fetch(`${API_URL}/wishlist/add/${productId}`, {
            method: 'POST',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to add to wishlist');
        return response.json();
    },

    async removeFromWishlist(productId: number): Promise<{ success: boolean; inWishlist: boolean }> {
        const response = await fetch(`${API_URL}/wishlist/remove/${productId}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to remove from wishlist');
        return response.json();
    },

    async checkWishlist(productId: number): Promise<{ inWishlist: boolean }> {
        const response = await fetch(`${API_URL}/wishlist/check/${productId}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) return { inWishlist: false };
        return response.json();
    },
};