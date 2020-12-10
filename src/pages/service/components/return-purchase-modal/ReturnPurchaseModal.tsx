import React, { useContext, useState } from 'react';
import { setAmount } from '../../../../common/api';
import Button from '../../../../components/button/Button';
import { AppContext } from '../../../../common/AppContext';
import './ReturnPurchaseModal.sass';
import { nanoid } from 'nanoid';
import Modal from '../../../../components/container/modal/Modal';
import QRCode from 'qrcode.react';
import { getDocument } from '../../../../common/api';

interface ReturnPurchaseModal {
  closeReturnPurchaseModal: () => void;
  submit?: () => void;
}

export default function ReturnPurchaseModal({ closeReturnPurchaseModal, submit }: ReturnPurchaseModal) {
  const { selectedProducts, total, setTotal, getAllProducts, setSelectedProducts } = useContext(AppContext);
  const [receiptId, setReceiptId] = useState(null as any);
  const [receiptData, setReceiptData] = useState(null as any);

  const handleSubmit = (): void => {
    getDocument('receipt', receiptId)
      .then(receipt => {
        console.log(receipt);
        if (receipt.exists) {
          const response: any = receipt.data();
          setReceiptData(response);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <Modal closeModal={() => closeReturnPurchaseModal()}>
        <div className='return-purchase'>
          <div>
            <h2 className='return-purchase-title'>Return purchase</h2>
            <div className='return-purchase-content'>
              {receiptData && (
                <div className='col-1'>
                  <ul>
                    {receiptData.products.map((item: any) => {
                      return item.count && <li key={item.id}>{`${item.count} ${item.name} ${item.price}€`}</li>;
                    })}
                  </ul>
                  <span>Total: {receiptData.total}€</span>
                  <span>receipt Id: {receiptId}</span>
                </div>
              )}
              <div className='col-2'>
                <form onSubmit={handleSubmit}>
                  <input autoFocus type='text' placeholder='Enter order id' onChange={event => setReceiptId(event.target.value)} />
                </form>
              </div>
            </div>
          </div>

          <div className='return-purchase-button'>
            <Button disabled={!receiptId} onClick={() => handleSubmit()}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
