export interface Product {
  id: string;
  name: string;
  amount: number;
  image: string;
  price: number;
  type: 'food' | 'clothes';
  count?: number;
}
