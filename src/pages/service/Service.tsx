import React, { useContext, useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import Header from '../../components/header/Header';
import ProductList from '../../components/product-list/ProductList';
import CheckoutModal from './components/checkout-modal/CheckoutModal';
import Footer from './components/footer/Footer';
import { AppContext, AppProvider } from './context';
import * as API from '../../api';

export default function Service() {
  const { setData, data } = useContext(AppContext);
  const [displayModal, setDisplayModal] = useState(false);
  const info = [
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

  useEffect(() => {
    const users: any = [];
    console.log('twat');
    API.getAllFoods().then((snapshot: any) => {
      snapshot.docs.forEach((user: any) => {
        const currentID = user.id;
        const appObj = { ...user.data(), ['id']: currentID };
        users.push(appObj);
        console.log(users);
        setData(users);
      });
    });
  }, []);
  return (
    <Container>
      <div>
        <Header title='Service' description='Click on the products picture to add it on the bill.'>
          <Button type='secondary' onClick={() => console.log('sss')}>
            Edit
          </Button>
        </Header>
        <ProductList title='Food' theme='#E3FCFF'></ProductList>
        {displayModal && <CheckoutModal closeModal={() => setDisplayModal(false)} />}
        <Footer onCheckout={() => setDisplayModal(true)}></Footer>
      </div>
    </Container>
  );
}
