import React, { useContext, useEffect, useState } from 'react';
import { setAmount } from '../../../../common/api';
import Button from '../../../../components/button/Button';
import { AppContext } from '../../../../common/AppContext';
import './CheckoutModal.sass';
import ReactPDF from '@react-pdf/renderer';
import { ReceiptTemplate } from './ReceiptTemplate';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';

interface CheckoutModalProps {
  closeModal: () => void;
  submit?: () => void;
}

export default function CheckoutModal({ closeModal, submit }: CheckoutModalProps) {
  const { selectedProducts, total, setTotal, getAllProducts, setSelectedProducts } = useContext(AppContext);
  const [cashIn, setCashIn] = useState(0);
  const [receiptId, setReceiptId] = useState('');

  const handleSubmit = (event: any) => {
    selectedProducts.forEach((each: any) => {
      if (each.count) {
        const doc = { ...each, amount: each.amount - each.count };
        delete doc.count;
        setAmount(each.type, each.id, doc);
      }
    });
    setTotal(0);
    localStorage.clear();
    setSelectedProducts([]);

    if (!selectedProducts) {
      getAllProducts();
    }
    closeModal();
  };

  useEffect(() => {
    const newDate = new Date();
    // ReactPDF.render(, `/example.pdf`);
  }, []);

  const createReceipt = () => {
    const id = nanoid();
    setReceiptId(id);

    console.log(id);
    const doc = { date: new Date().toUTCString(), id: id, company: 'Epick sale', products: selectedProducts, total: total };
    if (id) {
      setAmount('receipt', id, doc);
    }
  };
  const renderPdf = () => {
    return JSON.stringify({});
  };
  return (
    <>
      <div className='checkout-modal'>
        <div className='content'>
          <div>
            <h2 className='title'>Checkout</h2>
            <div className='columns'>
              <div className='col-1'>
                <ul>
                  {selectedProducts.map((item: any) => {
                    return item.count && <li key={item.id}>{`${item.count} ${item.name} ${item.price}€`}</li>;
                  })}
                </ul>

                <span>Total: {total}€</span>
                {receiptId && <span>receipt Id: {receiptId}</span>}
              </div>

              <div className='col-2'>
                <form onSubmit={handleSubmit}>
                  <input autoFocus type='number' placeholder='cash in' onChange={(event: any) => setCashIn(event.target.value)} />
                </form>
                {cashIn > total && <span className='cash-back'>Cash back: {Math.abs(total - cashIn)} €</span>}
              </div>
            </div>
          </div>

          <div className='qrcode'>
            {receiptId ? (
              <>
                <QRCode value={`https://energia-test.netlify.app/receipt/${receiptId}`} />
              </>
            ) : (
              <Button disabled={cashIn < total} onClick={() => createReceipt()}>
                Generate receipt
              </Button>
            )}
          </div>

          <div className='buttons'>
            <Button type='secondary' onClick={() => closeModal()}>
              Back
            </Button>
            <Button disabled={cashIn < total} onClick={() => handleSubmit({})}>
              Done
            </Button>
          </div>
        </div>
      </div>
      <div className='checkout-modal-overlay'></div>
    </>
  );
}
