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
  const { setFoodData, foodData, setTotal } = useContext(AppContext);
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    setTotal(JSON.parse(localStorage.getItem('total') || '0'));
    API.getAllFoods().then((allfoods: any) => {
      const foods: any = [];
      allfoods.docs.forEach((food: any) => {
        foods.push(food.data());
      });
      setFoodData(foods);
    });
  }, []);
  return (
    <Container>
      <Header title='Service' description='Click on the products picture to add it on the bill.'>
        <Button type='secondary' onClick={() => console.log('sss')}>
          Edit
        </Button>
      </Header>
      <ProductList data={foodData} title='food' theme='#E3FCFF'></ProductList>
      {displayModal && <CheckoutModal closeModal={() => setDisplayModal(false)} />}
      <Footer onCheckout={() => setDisplayModal(true)}></Footer>
    </Container>
  );
}
