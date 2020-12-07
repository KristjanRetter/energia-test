import React, { useContext, useEffect } from 'react';
import Button from '../../../../components/button/Button';
import './Footer.sass';
import { AppContext } from '../../context';

export default function Footer({ onCheckout }: any) {
  const { total } = useContext(AppContext);

  return (
    <footer className='footer'>
      <span className='price'>Total: {total} €</span>
      <div className='buttons'>
        <Button type='danger' onClick={() => console.log('test')}>
          Reset
        </Button>
        <Button onClick={() => onCheckout()}>Checkout</Button>
      </div>
    </footer>
  );
}
