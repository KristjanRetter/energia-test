import React, { useContext, useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import Header from '../../components/header/Header';
import ProductList from '../../components/product-list/ProductList';
import CheckoutModal from './components/checkout-modal/CheckoutModal';
import Footer from './components/footer/Footer';
import { AppContext } from '../../common/AppContext';
import { Link } from 'react-router-dom';

export default function Service() {
  const { foodData, clothesData, setTotal, getAllProducts, setSelectedProducts, total } = useContext(AppContext);
  const [displayModal, setDisplayModal] = useState(false);

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
      <ProductList data={foodData} title='food' theme='#E3FCFF'></ProductList>
      <ProductList data={clothesData} title='clothes' theme='#E3FFF3'></ProductList>
      {displayModal && <CheckoutModal closeModal={() => setDisplayModal(false)} />}
      <Footer total={total}>
        <Button type='danger' onClick={() => reset()}>
          Reset
        </Button>
        <Button disabled={total === 0} onClick={() => setDisplayModal(true)}>
          Checkout
        </Button>
      </Footer>
    </Container>
  );
}
