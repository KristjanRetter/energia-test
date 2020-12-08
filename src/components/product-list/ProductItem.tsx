import React, { useState, useEffect, useContext } from 'react';
import Button from '../button/Button';
import CloseIcon from '../../assets/close-icon.svg';
import './ProductItem.sass';
import { AppContext } from '../../pages/service/context';
import * as API from '../../api';

interface ProductItem {
  product: any;
  type: string;
  edit?: boolean;
}

export default function ProductItem({ product, type, edit }: ProductItem) {
  const selectedItemsList = JSON.parse(localStorage.getItem('counts') || '');
  const [count, setCount] = useState(product.count || 0);
  const [inStock, setInStock] = useState(true);
  const [amount, setAmount] = useState(product.amount);

  const currentIndexStorage = selectedItemsList.findIndex((x: any) => x.id === product.id);
  const { total, setTotal } = useContext(AppContext);

  useEffect(() => {
    setInStock(count < product.amount);
    if (currentIndexStorage !== -1) {
      selectedItemsList[currentIndexStorage].count = count;
      if (!count) {
        selectedItemsList.splice(currentIndexStorage, 1);
      }
    } else if (currentIndexStorage === -1 && count) {
      selectedItemsList.push({
        ...product,
        count: count,
      });
    }
    localStorage.setItem('counts', JSON.stringify(selectedItemsList));
  }, [count]);

  const increaceCount = () => {
    setTotal(total + product.price);
    setCount(count + 1);
  };

  const decreaceCount = () => {
    setTotal(total - product.price);
    setCount(count - 1);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const doc = {
      ...product,
      amount: amount,
    };
    API.setAmount(product.type, product.id, doc);
  };

  return (
    <li className='product-item'>
      <div className='image-container'>
        {count !== 0 && !edit && (
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
            if (inStock && !edit) increaceCount();
          }}
          src={product.image}
        ></img>
      </div>

      <span className='name'>{product.name}</span>
      {!edit && <span className='price'>{product.price} €</span>}
      {edit && (
        <form onSubmit={() => handleSubmit(event)} className='edit-form'>
          <label className='input-lable'>
            amount: <input className='input' value={amount} onChange={event => setAmount(event.target.value)} type='text' name='name' />
          </label>
          <input className='form-submit' type='submit' value='Save' />
        </form>
      )}
    </li>
  );
}
