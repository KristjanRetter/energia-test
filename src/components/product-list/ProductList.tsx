import React from 'react';
import ProductItem from './ProductItem';
import './ProductList.sass';

interface ProductListProps {
  theme?: any;
  data: any;
  title: string;
  edit?: boolean;
}

export default function ProductList({ theme, title, data, edit }: ProductListProps) {
  return (
    <>
      <h3 className='product-list-title' style={{ color: theme.text }}>
        {title}
      </h3>
      <ul className='product-list' style={{ background: theme.background }}>
        {data.map((product: any) => (
          <ProductItem edit={edit} type={title} key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}
