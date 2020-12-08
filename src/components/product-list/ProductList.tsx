import React from 'react';
import ProductItem from './ProductItem';
import './ProductList.sass';

interface ProductListProps {
  theme?: string;
  data: any;
  title: string;
  edit?: boolean;
}

export default function ProductList({ theme, title, data, edit }: ProductListProps) {
  return (
    <>
      <h3 className='product-list-title'>{title}</h3>
      <ul className='product-list' style={{ background: theme }}>
        {data.map((product: any) => (
          <ProductItem edit={edit} type={title} key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}
