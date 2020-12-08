import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../pages/service/context';
import ProductItem from './ProductItem';
import './ProductList.sass';

interface ProductListProps {
  theme?: string;
  data: any;
  title: string;
  edit?: boolean;
}

export default function ProductList({ theme, title, data, edit }: ProductListProps) {
  const selectedItemsList = JSON.parse(localStorage.getItem('counts') || '[]');

  useEffect(() => {
    console.log('list');
    console.log(data);
    if (!localStorage.getItem('counts')) {
      localStorage.setItem('counts', '[]');
    }
  }, []);

  const addCount = (dood: any) => {
    const hasCount = selectedItemsList.find((item: any) => item.id === dood.id);
    return hasCount ? { ...dood, count: hasCount.count } : dood;
  };

  return (
    <>
      <h3 className='product-list-title'>{title}</h3>
      <ul className='product-list' style={{ background: theme }}>
        {data.map((food: any) => (
          <ProductItem edit={edit} type={title} key={food.id} product={addCount(food)} />
        ))}
      </ul>
    </>
  );
}
