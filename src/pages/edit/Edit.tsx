import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import Header from '../../components/header/Header';

export default function Edit() {
  return (
    <Container>
      <Header title='Edit' description='Here you can change the amount of available products.'>
        <Link to='/'>
          <Button type='secondary'>Service</Button>
        </Link>
      </Header>
    </Container>
  );
}
