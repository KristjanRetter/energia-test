import React, { useContext, useEffect } from 'react';
import Button from '../../../../components/button/Button';
import './Footer.sass';
import { TotalContext } from '../../../../App';

export default function Footer({ onCheckout }: any) {
  const price = 20;
  const [total] = useContext(TotalContext);

  useEffect(() => {
    localStorage.setItem('total', JSON.stringify(total));
  });

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
