import React from 'react';
import Button from '../../components/button/Button';
import './Receipt.sass';
import Container from '../../components/container/Container';
import { ReceiptTemplate } from '../service/components/checkout-modal/ReceiptTemplate';
import { pdf } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import { getDocument } from '../../common/api';

export default function Receipt() {
  const { id }: any = useParams();

  const saveBlob = (blob: any, filename: any) => {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const savePdf = async (document: any, filename: any) => {
    saveBlob(await pdf(document).toBlob(), filename);
  };

  const handleDownload = () => {
    console.log(id);
    getDocument('receipt', id)
      .then(receipt => {
        console.log(receipt);
        const info = receipt.data();
        console.log(receipt.exists);
        if (receipt.data()) {
          console.log(receipt.data());
          savePdf(<ReceiptTemplate data={receipt.data()} />, `receipt-${id}.pdf`);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='receipt-container'>
      <Button onClick={() => handleDownload()}>Download receipt</Button>
    </div>
  );
}
