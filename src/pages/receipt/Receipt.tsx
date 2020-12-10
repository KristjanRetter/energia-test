import React, { useEffect, useState } from 'react';
import './Receipt.sass';
import { ReceiptTemplate } from './ReceiptTemplate';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import { getDocument } from '../../common/api';
import Button from '../../components/button/Button';
import { OrderReceipt } from '../../typings/OrderReceipt';

export default function Receipt(): React.FunctionComponentElement<unknown> {
  const { id }: { id: string } = useParams();
  const [receiptData, setReceiptData] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    getDocument('receipt', id)
      .then(receipt => {
        if (receipt.exists) {
          const response = receipt.data();
          setReceiptData(response as OrderReceipt);
        }
      })
      .catch(error => console.log(error));
    // eslint-disable-next-line
  }, []);

  return (
    <div className='receipt-container'>
      {receiptData && (
        <PDFDownloadLink document={<ReceiptTemplate data={receiptData} />} fileName={'receipt-' + id + '.pdf'}>
          <Button> Download receipt</Button>
        </PDFDownloadLink>
      )}
    </div>
  );
}
