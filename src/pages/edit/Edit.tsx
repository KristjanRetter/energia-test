import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import Header from '../../components/header/Header';
import ProductList from '../../components/product-list/ProductList';
import { AppContext } from '../service/context';

export default function Edit() {
  const { setFoodData, foodData, clothesData, setClothesData, setTotal } = useContext(AppContext);

  return (
    <Container>
      <Header title='Edit' description='Here you can change the amount of available products.'>
        <Link to='/'>
          <Button type='secondary'>Service</Button>
        </Link>
      </Header>
      <ProductList edit={true} data={foodData} title='food' theme='#E3FCFF'></ProductList>
      <ProductList edit={true} data={clothesData} title='clothes' theme='#E3FFF3'></ProductList>
    </Container>
  );
}
