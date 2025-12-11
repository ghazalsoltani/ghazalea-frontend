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