import React, { useEffect } from 'react';
import ProductItem from './ProductItem';
import './ProductList.sass';

interface ProductListProps {
  theme?: string;
  data: any;
  title: string;
}

export default function ProductList({ theme, data, title }: ProductListProps) {
  useEffect(() => {
    // if (!localStorage.getItem(title)) {
    //localStorage.setItem(title, '[]');
    //  }
  }, []);
  return (
    <>
      <h3 className='product-list-title'>{title}</h3>
      <ul className='product-list' style={{ background: theme }}>
        {data.map((food: any) => (
          <ProductItem type={title} key={food.id} data={food} />
        ))}
      </ul>
    </>
  );
}
