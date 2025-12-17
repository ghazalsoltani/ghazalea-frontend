// Category interface-matches what the symfony API returns
export interface Category {
    id: number;
    name: string;
    slug: string
}
// Product interface-matches the product entity in Symfony
export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    illustration: string;
    price: number;
    tva: number;
    category: Category;
    isHomeage: boolean
}
export interface CartItem {
    product: Product;
    quantity: number
}

export interface Address {
    id: number,
    firstname: string;
    lastname: string;
    address: string;
    postal: string;
    city: string;
    country: string;
    phone: string;
}

// Form data for creating new address
export interface AddressFormData {
    firstname: string;
    lastname: string;
    address: string;
    postal: string;
    city: string;
    country: string;
    phone: string;

}

export interface Carrier {
    id: number;
    name: string;
    description: string;
    price: number;
}
// Order detail
export interface OrderDetail {
    productName: string;
    productIllustration: string;
    productPrice: number;
    productQuantity: number;
}

// Order type
export interface Order {
    id: number;
    createdAt: string;
    state: number;
    carrierName: string;
    carrierPrice: number;
    delivery: string;
    orderDetails: OrderDetail[];
    total: number;
}