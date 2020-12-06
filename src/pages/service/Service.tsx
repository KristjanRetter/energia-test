import React, { useEffect } from 'react';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import Header from '../../components/header/Header';
import ProductList from '../../components/product-list/ProductList';
import Footer from './components/footer/Footer';

export default function Service() {
  const data = [
    {
      id: '1',
      name: 'Cookie',
      price: 5,
      image:
        'https://firebasestorage.googleapis.com/v0/b/energia-test.appspot.com/o/brownie.svg?alt=media&token=bec94bed-ed7a-4143-9dc5-2b820c6c6481',
      amount: 6,
    },
    {
      id: '2',
      name: 'Cookie',
      price: 5,
      image:
        'https://firebasestorage.googleapis.com/v0/b/energia-test.appspot.com/o/brownie.svg?alt=media&token=bec94bed-ed7a-4143-9dc5-2b820c6c6481',
      amount: 6,
    },
    {
      id: '3',
      name: 'Cookie',
      price: 5,
      image:
        'https://firebasestorage.googleapis.com/v0/b/energia-test.appspot.com/o/brownie.svg?alt=media&token=bec94bed-ed7a-4143-9dc5-2b820c6c6481',
      amount: 6,
    },
    {
      id: '4',
      name: 'Cookie',
      price: 5,
      image:
        'https://firebasestorage.googleapis.com/v0/b/energia-test.appspot.com/o/brownie.svg?alt=media&token=bec94bed-ed7a-4143-9dc5-2b820c6c6481',
      amount: 6,
    },
    {
      id: '5',
      name: 'Cookie',
      price: 5,
      image:
        'https://firebasestorage.googleapis.com/v0/b/energia-test.appspot.com/o/brownie.svg?alt=media&token=bec94bed-ed7a-4143-9dc5-2b820c6c6481',
      amount: 6,
    },
    {
      id: '6',
      name: 'Cookie',
      price: 5,
      image:
        'https://firebasestorage.googleapis.com/v0/b/energia-test.appspot.com/o/brownie.svg?alt=media&token=bec94bed-ed7a-4143-9dc5-2b820c6c6481',
      amount: 6,
    },
  ];
  return (
    <Container>
      <div>
        <Header title='Service' description='Click on the products picture to add it on the bill.'>
          <Button type='secondary' onClick={() => console.log('sss')}>
            Edit
          </Button>
        </Header>
        <ProductList title='Food' theme='#E3FCFF' data={data}></ProductList>
        <Footer></Footer>
      </div>
    </Container>
  );
}
