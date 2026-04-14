
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: number;
  customerName: string;
  email: string;
  address: string;
  items: CartItem[];
  total: number;
  date?: string;
}
