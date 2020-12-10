import React, { useContext, useState } from 'react';
import { setDocument } from '../../../../common/api';
import Button from '../../../../components/button/Button';
import { AppContext } from '../../../../common/AppContext';
import './CheckoutModal.sass';
import { nanoid } from 'nanoid';
import Modal from '../../../../components/container/modal/Modal';
import QRCode from 'qrcode.react';
import { Product } from '../../../../typings/Product';

interface CheckoutModalProps {
  closeCheckoutModal: () => void;
  submit?: () => void;
}

export default function CheckoutModal({ closeCheckoutModal }: CheckoutModalProps): React.FunctionComponentElement<CheckoutModalProps> {
  const { selectedProducts, total, setTotal, getAllProducts, setSelectedProducts } = useContext(AppContext);
  const [cashIn, setCashIn] = useState<number>(0);
  const [receiptId, setReceiptId] = useState('');

  const handleCheckout = () => {
    selectedProducts.forEach((product: Product) => {
      if (product.count) {
        const doc = { ...product, amount: product.amount - product.count };
        delete doc.count;
        setDocument(product.type, product.id, doc);
      }
    });
    setTotal(0);
    setSelectedProducts([]);
    getAllProducts();
    closeCheckoutModal();
  };

  const createReceipt = () => {
    const id = nanoid();
    const doc = { date: new Date().toUTCString(), id: id, company: 'Epick sale', products: selectedProducts, total: total };
    setReceiptId(id);
    setDocument('receipt', id, doc);
  };

  return (
    <>
      <Modal closeModal={() => closeCheckoutModal()}>
        <div className='checkout-modal'>
          <div>
            <h2 className='checkout-title'>Checkout</h2>
            <div className='checkout-content'>
              <div className='col-1'>
                <ul>
                  {selectedProducts.map((product: Product) => {
                    return product.count && <li key={product.id}>{`${product.count} ${product.name} ${product.price}€`}</li>;
                  })}
                </ul>
                <span className='checkout-total'>Total: {total}€</span>
                {receiptId && <span>Receipt Id: {receiptId}</span>}
              </div>
              <div className='col-2'>
                <form onSubmit={handleCheckout}>
                  <input
                    autoFocus
                    type='number'
                    placeholder='Cash in'
                    // eslint-disable-next-line
                    onChange={(event: React.ChangeEvent<any>) => setCashIn(event.target.value)}
                  />
                </form>
                {cashIn > total && <span className='cash-back'>Cash back: {Math.abs(total - cashIn)} €</span>}
              </div>
            </div>
          </div>
          <div className='checkout-buttons'>
            {receiptId ? (
              <div className='qrcode'>
                <QRCode size={200} value={`https://energia-test.netlify.app/receipt/${receiptId}`} />
              </div>
            ) : (
              <Button disabled={cashIn < total} onClick={() => createReceipt()}>
                Receipt
              </Button>
            )}
            <Button disabled={cashIn < total} onClick={() => handleCheckout()}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
