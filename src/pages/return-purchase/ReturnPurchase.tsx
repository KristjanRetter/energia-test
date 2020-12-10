import React, { useState } from 'react';
import { getDocument } from '../../common/api';
import Container from '../../components/container/Container';
import { Product } from '../../typings/Product';
import { OrderReceipt } from '../../typings/Receipt';

export default function ReturnPurchase(): React.FunctionComponentElement<unknown> {
  const [orderId, setOrderId] = useState('');
  const [receiptData, setReceiptData] = useState<null | OrderReceipt>(null);

  // eslint-disable-next-line
  const returnPurchaseOrder = (event: React.ChangeEvent<any>): void => {
    event.preventDefault();
    getDocument('receipt', orderId)
      .then(receipt => {
        if (receipt.exists) {
          const response = receipt.data();
          setReceiptData(response as OrderReceipt);
        }
      })
      .catch(error => console.log(error));
  };
  return (
    <Container>
      <form onSubmit={event => returnPurchaseOrder(event)} className='edit-form'>
        <label className='input-lable'>
          id:{' '}
          <input
            placeholder='Enter order id'
            className='input'
            value={orderId}
            onChange={event => setOrderId(event.target.value)}
            type='text'
            name='name'
          />
        </label>
        <input className='form-submit' type='submit' value='Save' />
      </form>
      {receiptData && (
        <ul>
          <li>
            <p>{receiptData.date}</p>
          </li>
          <li>
            <p>id: {receiptData.id}</p>
          </li>
          <li>
            <p>company: {receiptData.company}</p>
          </li>
          <li>
            <p>products:</p>
            {receiptData.products.map((product: Product) => (
              <p key={product.id}>{`${product.count} ${product.name} ${product.price}€`}</p>
            ))}
          </li>
          <li>
            <p>Total: {receiptData.total}</p>
          </li>
        </ul>
      )}
    </Container>
  );
}
