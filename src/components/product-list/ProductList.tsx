import React, { useEffect } from 'react';
import ProductItem from './ProductItem';
import './ProductList.sass';

interface ProductListProps {
  theme?: string;
  data: any;
  title: string;
}

export default function ProductList({ theme, data, title }: ProductListProps) {
  const selectedItemsList = JSON.parse(localStorage.getItem(title) || '');

  useEffect(() => {
    if (!localStorage.getItem(title)) {
      localStorage.setItem(title, '[]');
    }
    if (!localStorage.getItem('total')) {
      localStorage.setItem('total', JSON.stringify(0));
    }
  }, []);

  const addCount = (dood: any) => {
    const hasCount = selectedItemsList.find((item: any) => item.id === dood.id);
    return hasCount ? { ...dood, count: hasCount.count } : dood;
  };

  return (
    <>
      <button
        onClick={() => {
          localStorage.setItem(title, '[]'), localStorage.setItem('total', '0');
        }}
      ></button>
      <h3 className='product-list-title'>{title}</h3>
      <ul className='product-list' style={{ background: theme }}>
        {data.map((food: any) => (
          <ProductItem type={title} key={food.id} data={addCount(food)} />
        ))}
      </ul>
    </>
  );
}
