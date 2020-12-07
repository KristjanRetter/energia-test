import React, { useState, useEffect, useContext } from 'react';
import Button from '../button/Button';
import CloseIcon from '../../assets/close-icon.svg';
import './ProductItem.sass';
import { TotalContext } from '../../App';
import { AppContext } from '../../pages/service/context';
import * as API from '../../api';

interface ProductItem {
  product: any;
  type: string;
}

export default function ProductItem({ product, type }: ProductItem) {
  const selectedItemsList = JSON.parse(localStorage.getItem(type) || '');
  const [count, setCount] = useState(product.count || 0);
  const [inStock, setInStock] = useState(true);
  const cindex = selectedItemsList.findIndex((x: any) => x.id === product.id);
  const [total, setTotal] = useContext(TotalContext);
  const { setData, data } = useContext(AppContext);
  const xindex = data.findIndex((x: any) => x.id === product.id);

  useEffect(() => {
    //API.setAmount(product.id, product);
    setInStock(count < product.amount);
    console.log(inStock);
    if (cindex !== -1) {
      selectedItemsList[cindex].count = count;
      console.log('store count', data[cindex]);
      data[xindex].count = count;
      if (!count) {
        delete data[xindex].count;
        selectedItemsList.splice(cindex, 1);
      }
    } else if (cindex === -1 && count) {
      console.log('store count2', cindex);

      data[xindex].count = count;
      selectedItemsList.push({
        id: product.id,
        count: count,
      });
    }
    setData(data);
    localStorage.setItem(type, JSON.stringify(selectedItemsList));
  }, [count]);

  const increaceCount = () => {
    setTotal(total + product.price);
    setCount(count + 1);
  };

  const decreaceCount = () => {
    setTotal(total - product.price);
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
          alt={product.name + ' picture'}
          className={inStock ? 'image' : 'image-gray'}
          onClick={() => {
            if (inStock) increaceCount();
          }}
          src={product.image}
        ></img>
      </div>
      <span className='name'>{product.name}</span>
      <span className='price'>{product.price} €</span>
    </li>
  );
}
