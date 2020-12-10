export interface Product {
  id: string;
  name: string;
  amount: number;
  image: URL;
  price: number;
  type: 'food' | 'clothes';
  count?: number;
}
