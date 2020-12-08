import React, { useContext, useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import Header from '../../components/header/Header';
import ProductList from '../../components/product-list/ProductList';
import CheckoutModal from './components/checkout-modal/CheckoutModal';
import Footer from './components/footer/Footer';
import { AppContext, AppProvider } from './context';
import * as API from '../../api';
import { Link } from 'react-router-dom';

export default function Service() {
  const { setFoodData, foodData, clothesData, setClothesData, setTotal } = useContext(AppContext);
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

    API.getAllClothes().then((allClothes: any) => {
      const clothes: any = [];
      allClothes.docs.forEach((clothing: any) => {
        clothes.push(clothing.data());
      });
      setClothesData(clothes);
    });
  }, []);

  return (
    <Container>
      <Header title='Service' description='Click on the products picture to add it on the bill.'>
        <Link to='/edit'>
          <Button type='secondary'>Edit</Button>
        </Link>
      </Header>
      <ProductList data={foodData} title='food' theme='#E3FCFF'></ProductList>
      <ProductList data={clothesData} title='clothes' theme='#E3FFF3'></ProductList>
      {displayModal && <CheckoutModal closeModal={() => setDisplayModal(false)} />}
      <Footer onReset={() => localStorage.clear()} onCheckout={() => setDisplayModal(true)}></Footer>
    </Container>
  );
}
