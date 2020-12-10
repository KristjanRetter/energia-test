import { Product } from './Product';

export interface OrderReceipt {
  id: string;
  company: string;
  date: DATE;
  products: Product[];
  total: number;
}
