import React, { useState, useEffect } from 'react';
import Button from '../button/Button';
import CloseIcon from '../../assets/close-icon.svg';
import './ProductItem.sass';

interface ProductItem {
  data: any;
  type: string;
}

export default function ProductItem({ data, type }: ProductItem) {
  const selectedItemsList = JSON.parse(localStorage.getItem(type) || '');
  const [count, setCount] = useState(0);
  const [hasStock, setHasStock] = useState(true);
  const cindex = selectedItemsList.findIndex((x: any) => x.id === data.id);

  useEffect(() => {
    if (selectedItemsList.length && cindex !== -1) {
      setCount(selectedItemsList[cindex].count);
    }
  }, []);

  useEffect(() => {
    setHasStock(count < data.amount);
    if (cindex !== -1) {
      if (count) {
        selectedItemsList[cindex].count = count;
      } else {
        selectedItemsList.splice(cindex, 1);
      }
    } else {
      if (count) {
        selectedItemsList.push({
          id: data.id,
          count: count,
        });
      }
    }

    localStorage.setItem(type, JSON.stringify(selectedItemsList));
  }, [count]);

  return (
    <li className='product-item'>
      <div className='image-container'>
        {count !== 0 && (
          <>
            <Button onClick={() => setCount(count - 1)} type='icon'>
              <img src={CloseIcon}></img>
            </Button>
            <span className='count'>{count}</span>
          </>
        )}
        <img
          height='100px'
          alt={data.name + ' picture'}
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
