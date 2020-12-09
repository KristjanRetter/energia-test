import React, { useEffect, useState } from 'react';
import './Receipt.sass';
import { ReceiptTemplate } from '../return-purchase/ReceiptTemplate';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import { getDocument } from '../../common/api';
import Button from '../../components/button/Button';

export default function Receipt() {
  const { id }: any = useParams();
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    getDocument('receipt', id)
      .then(receipt => {
        console.log(receipt);
        if (receipt.exists) {
          const response: any = receipt.data();
          setReceiptData(response);
        }
      })
      .catch(error => console.log(error));
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
