import React, { useContext, useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import Header from '../../components/header/Header';
import ProductList from '../../components/product-list/ProductList';
import CheckoutModal from './components/checkout-modal/CheckoutModal';
import Footer from './components/footer/Footer';
import { AppContext } from '../../common/AppContext';
import { Link } from 'react-router-dom';
import ReturnPurchaseModal from './components/return-purchase-modal/ReturnPurchaseModal';
import './Service.sass';

export default function Service() {
  const { foodData, clothesData, setTotal, getAllProducts, setSelectedProducts, total } = useContext(AppContext);
  const [displayCheckoutModal, setDisplayCheckoutModal] = useState(false);
  const [displayReturnPurchaseModal, setDisplayReturnPurchaseModal] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const reset = () => {
    setTotal(0);
    setSelectedProducts([]);
    getAllProducts();
  };

  return (
    <Container>
      <Header title='Service' description='Click on the products picture to add it on the bill.'>
        <Link to='/edit'>
          <Button type='secondary'>Edit</Button>
        </Link>
      </Header>
      <ProductList data={foodData} title='food' theme='#E3FFF3'></ProductList>
      <ProductList data={clothesData} title='clothes' theme='#E3FCFF'></ProductList>
      {displayCheckoutModal && <CheckoutModal closeModal={() => setDisplayCheckoutModal(false)} />}
      {displayReturnPurchaseModal && <ReturnPurchaseModal closeModal={() => setDisplayReturnPurchaseModal(false)} />}
      <Footer total={total}>
        <div className='footer-buttons'>
          <Button type='secondary' onClick={() => reset()}>
            Return purchase
          </Button>
          <div className='right-buttons'>
            <Button type='danger' onClick={() => reset()}>
              Reset
            </Button>
            <Button disabled={total === 0} onClick={() => setDisplayCheckoutModal(true)}>
              Checkout
            </Button>
          </div>
        </div>
      </Footer>
    </Container>
  );
}
