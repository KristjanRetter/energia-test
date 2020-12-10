import React from 'react';
import { Product } from '../../typings/Product';
import ProductItem from './ProductItem';
import './ProductList.sass';

interface ProductListProps {
  theme: {
    text: string;
    background: string;
  };
  data: Product[];
  title: string;
  edit?: boolean;
}

export default function ProductList({ theme, title, data, edit }: ProductListProps): React.FunctionComponentElement<ProductListProps> {
  return (
    <>
      <h3 className='product-list-title' style={{ color: theme.text }}>
        {title}
      </h3>
      <ul className='product-list' style={{ background: theme.background }}>
        {data.map((product: Product) => (
          <ProductItem edit={edit} type={title} key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}
