import React, { useState, useEffect, useContext } from 'react';
import Button from '../button/Button';
import CloseIcon from '../../assets/close-icon.svg';
import './ProductItem.sass';
import { AppContext } from '../../common/AppContext';
import { setDocument } from '../../common/api';
import { Product } from '../../typings/Product';

interface ProductItemProps {
  product: Product;
  type: string;
  edit?: boolean;
}

export default function ProductItem({ product, edit }: ProductItemProps): React.FunctionComponentElement<ProductItemProps> {
  const { total, setTotal, setSelectedProducts, selectedProducts, getAllProducts } = useContext(AppContext);
  const [count, setCount] = useState(product.count || 0);
  const [inStock, setInStock] = useState(true);
  const [first, setFirst] = useState(true);
  const [amount, setAmount] = useState(product.amount);
  const productLocalStorageIndex = selectedProducts.findIndex((x: Product) => x.id === product.id);

  useEffect(() => {
    setInStock(count < product.amount);
    if (!edit || !first) {
      const isProductSelected = productLocalStorageIndex !== -1;
      if (edit) return;
      if (isProductSelected) {
        selectedProducts[productLocalStorageIndex].count = count;
        if (!count) {
          selectedProducts.splice(productLocalStorageIndex, 1);
        }
      } else if (!isProductSelected && count) {
        selectedProducts.push({
          ...product,
          count: count,
        });
      }
      setSelectedProducts(selectedProducts);
    }
    setFirst(false);
    // eslint-disable-next-line
  }, [count]);

  useEffect(() => {
    setInStock(count < product.amount);
    // eslint-disable-next-line
  }, [product]);

  useEffect(() => {
    if (selectedProducts.length === 0) {
      setCount(0);
    }
  }, [selectedProducts]);

  const increaceCount = (): void => {
    setTotal(total + product.price);
    setCount(count + 1);
  };

  const decreaceCount = (): void => {
    setTotal(total - product.price);
    setCount(count - 1);
  };

  // eslint-disable-next-line
  const updateAmount = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    const doc = {
      ...product,
      amount: amount,
    };
    delete doc.count;
    setDocument(product.type, product.id, doc).then(() => {
      getAllProducts();
    });
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
          width='100px'
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
        <form onSubmit={event => updateAmount(event)} className='edit-form'>
          <label className='input-lable'>
            amount:{' '}
            <input
              type='number'
              className='input'
              value={amount}
              // eslint-disable-next-line
              onChange={(event: React.ChangeEvent<any>) => setAmount(event.target.value)}
            />
          </label>
          <input className='form-submit' type='submit' value='Save' />
        </form>
      )}
    </li>
  );
}
