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
  const asi = JSON.parse(localStorage.getItem('total') || '0');

  const [count, setCount] = useState(data.count || 0);
  const [hasStock, setHasStock] = useState(true);
  // const [total, setTotal] = useState(asi);
  const cindex = selectedItemsList.findIndex((x: any) => x.id === data.id);

  useEffect(() => {
    setHasStock(count < data.amount);
    if (cindex !== -1) {
      selectedItemsList[cindex].count = count;
      if (!count) selectedItemsList.splice(cindex, 1);
    } else if (cindex === -1 && count) {
      selectedItemsList.push({
        id: data.id,
        count: count,
        price: data.price,
      });
    }
    localStorage.setItem(type, JSON.stringify(selectedItemsList));
    const ss = JSON.parse(localStorage.getItem('Food') || '');

    const neee = ss.reduce((a: any, b: any) => a + b['price'], 0);
    console.log(neee);
  }, [count]);

  const increaceCount = () => {
    localStorage.setItem('total', JSON.stringify(asi + data.price));

    setCount(count + 1);
  };

  const decreaceCount = () => {
    localStorage.setItem('total', JSON.stringify(asi - data.price));
    setCount(count - 1);
  };

  return (
    <li className='product-item'>
      <div className='image-container'>
        {count !== 0 && (
          <>
            <Button onClick={() => decreaceCount()} type='icon'>
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
            if (hasStock) increaceCount();
          }}
          src={data.image}
        ></img>
      </div>
      <span className='name'>{data.name}</span>
      <span className='price'>{data.price} €</span>
    </li>
  );
}
