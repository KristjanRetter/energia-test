import React, { useContext, useEffect, useState } from 'react';
import { setAmount } from '../../../../api';
import { TotalContext } from '../../../../App';
import Button from '../../../../components/button/Button';
import { AppContext } from '../../context';
import './CheckoutModal.sass';
import * as API from '../../../../api';

interface CheckoutModalProps {
  closeModal: () => void;
  submit?: () => void;
}

export default function CheckoutModal({ closeModal, submit }: CheckoutModalProps) {
  const { setData, data } = useContext(AppContext);
  const [total, setTotal] = useContext(TotalContext);
  const [chasIn, setChasIn] = useState(0);

  useEffect(() => {
    console.log(data);
  }, []);

  const handleChange = (event: any) => {
    setChasIn(event.target.value);
  };

  const handleSubmit = (event: any) => {
    console.log('enter');
    //event.preventDefault();
    data.forEach((each: any) => {
      if (each.count) {
        const doc = { ...each, amount: each.amount - each.count };
        delete doc.count;
        setAmount(each.id, doc);
      }
    });
    localStorage.setItem('Food', '[]');
    setTotal(0);

    const users: any = [];
    API.getAllFoods().then((snapshot: any) => {
      snapshot.docs.forEach((user: any) => {
        const currentID = user.id;
        const appObj = { ...user.data(), ['id']: currentID };
        users.push(appObj);
        console.log(users);
        setData(users);
      });
    });
    closeModal();
  };

  return (
    <>
      <div className='checkout-modal'>
        <div className='content'>
          <h2 className='title'>Checkout</h2>

          <div className='columns'>
            <div className='col-1'>
              <ul>
                {data.map((item: any) => {
                  return item.count && <li key={item.id}>{`${item.count} ${item.name} ${item.price * item.count}€`}</li>;
                })}
              </ul>

              <span>{total}€</span>
              <span>Refrence 20¤</span>
            </div>

            <div className='col-2'>
              <form onSubmit={handleSubmit}>
                <input autoFocus type='number' placeholder='cash in' onChange={handleChange} />
              </form>
              {chasIn > total && <span className='cash-back'>Cash back: {Math.abs(total - chasIn)} €</span>}
            </div>
          </div>
          <div className='buttons'>
            <Button type='secondary' onClick={() => closeModal()}>
              Back
            </Button>
            <Button onClick={() => handleSubmit({})}>Done</Button>
          </div>
        </div>
      </div>
      <div className='checkout-modal-overlay'></div>
    </>
  );
}
