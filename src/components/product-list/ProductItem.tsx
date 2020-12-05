import React, { useState, useEffect } from 'react';
import Button from '../button/Button';
import CloseIcon from '../../assets/close-icon.svg';
import './ProductItem.sass';

interface ProductItem {
  data: any;
}

export default function ProductItem({ data }: ProductItem) {
  const [count, setCount] = useState(0);
  const [hasStock, setHasStock] = useState(true);

  useEffect(() => {
    setHasStock(count < data.amount);
  }, [count]);

  return (
    <li className='product-item'>
      <div className='image-container'>
        {count !== 0 && (
          <>
            <div className='remove-button'>
              <Button onClick={() => setCount(count - 1)} type='icon'>
                <img src={CloseIcon}></img>
              </Button>
            </div>
            <span className='count'>{count}</span>
          </>
        )}
        <img
          className={hasStock ? 'image' : 'image-gray'}
          onClick={() => {
            if (hasStock) setCount(count + 1);
          }}
          src={data.image}
        ></img>
      </div>
      <span className='name'>{data.name}</span>
      <span className='price'>{data.price} €</span>
    </li>
  );
}
