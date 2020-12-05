import React from 'react';
import ProductItem from './ProductItem';

interface ProductListProps {
  theme?: 'string';
  data: any;
}

export default function ProductList({ theme, data }: ProductListProps) {
  return (
    <ul className='product-list'>
      {data.map((food: any) => (
        <ProductItem key={food.id} data={food} />
      ))}
    </ul>
  );
}
