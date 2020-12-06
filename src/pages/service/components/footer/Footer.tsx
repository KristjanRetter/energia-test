import React from 'react';
import Button from '../../../../components/button/Button';
import './Footer.sass';

export default function Footer() {
  const price = 20;
  return (
    <footer className='footer'>
      <span className='price'>Total: {price} €</span>
      <div className='buttons'>
        <Button type='danger' onClick={() => console.log('test')}>
          Reset
        </Button>
        <Button onClick={() => console.log('test')}>Checkout</Button>
      </div>
    </footer>
  );
}
