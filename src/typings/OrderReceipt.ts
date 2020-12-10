import { Product } from './Product';

export interface OrderReceipt {
  id: string;
  company: string;
  date: string;
  products: Product[];
  total: number;
}
