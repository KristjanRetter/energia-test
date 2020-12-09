import React, { useState } from 'react';
import Container from '../../components/container/Container';

export default function ReturnPurchase() {
  const [orderId, setOrderId] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
  return (
    <Container>
      <input type='text' placeholder='Enter order id'></input>
      <form onSubmit={() => handleSubmit(event)} className='edit-form'>
        <label className='input-lable'>
          id: <input className='input' value={orderId} onChange={event => setOrderId(event.target.value)} type='text' name='name' />
        </label>
        <input className='form-submit' type='submit' value='Save' />
      </form>
    </Container>
  );
}
