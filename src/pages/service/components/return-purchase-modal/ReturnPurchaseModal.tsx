import React, { useState } from 'react';
import Button from '../../../../components/button/Button';
import './ReturnPurchaseModal.sass';
import Modal from '../../../../components/modal/Modal';
import { getDocument } from '../../../../common/api';
import { OrderReceipt } from '../../../../typings/OrderReceipt';
import { Product } from '../../../../typings/Product';

interface ReturnPurchaseModal {
  closeReturnPurchaseModal: () => void;
}

export default function ReturnPurchaseModal({
  closeReturnPurchaseModal,
}: ReturnPurchaseModal): React.FunctionComponentElement<ReturnPurchaseModal> {
  const [receiptId, setReceiptId] = useState<string | null>(null);
  const [receiptData, setReceiptData] = useState<OrderReceipt | null>(null);

  const returnReceipt = (): void => {
    if (!receiptId) return;
    getDocument('receipt', receiptId)
      .then(receipt => {
        if (receipt.exists) {
          const response = receipt.data();
          setReceiptData(response as OrderReceipt);
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
                    {receiptData.products.map((item: Product) => {
                      return item.count && <li key={item.id}>{`${item.count} ${item.name} ${item.price}€`}</li>;
                    })}
                  </ul>
                  <span>Total: {receiptData.total}€</span>
                  <span>receipt Id: {receiptId}</span>
                </div>
              )}
              <div className='col-2'>
                <form onSubmit={returnReceipt}>
                  <input autoFocus type='text' placeholder='Enter order id' onChange={event => setReceiptId(event.target.value)} />
                </form>
              </div>
            </div>
          </div>

          <div className='return-purchase-button'>
            <Button disabled={!receiptId} onClick={() => returnReceipt()}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
