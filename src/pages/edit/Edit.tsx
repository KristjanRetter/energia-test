import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import Header from '../../components/header/Header';
import ProductList from '../../components/product-list/ProductList';
import { AppContext } from '../../common/AppContext';

export default function Edit() {
  const { getAllProducts, setFoodData, foodData, selectedProducts, clothesData, setClothesData, setTotal } = useContext(AppContext);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container>
      <Header title='Edit' description='Here you can change the amount of available products.'>
        <Link to='/'>
          <Button type='secondary'>Service</Button>
        </Link>
      </Header>
      <ProductList edit={true} data={foodData} title='food' theme={{ background: '#E3FFF3', text: '#00fb8f' }}></ProductList>
      <ProductList edit={true} data={clothesData} title='clothes' theme={{ background: '#E3FCFF', text: '#00E4FF' }}></ProductList>
    </Container>
  );
}
