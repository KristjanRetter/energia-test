import React from 'react';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import Header from '../../components/header/Header';
import CloseIcon from '../../assets/close-icon.svg';

export default function Service() {
  return (
    <Container>
      <div>
        <Header title='Service' description='Click on the products picture to add it on the bill.'>
          <Button type='secondary' onClick={() => console.log('sss')}>
            Edit
          </Button>
        </Header>

        <Button onClick={() => console.log('sss')}>primary</Button>
        <Button disabled={true} onClick={() => console.log('sss')}>
          disabled
        </Button>
        <Button type='danger' onClick={() => console.log('sss')}>
          danger
        </Button>
        <Button type='icon' onClick={() => console.log('sss')}>
          <img src={CloseIcon} />
        </Button>
      </div>
    </Container>
  );
}
