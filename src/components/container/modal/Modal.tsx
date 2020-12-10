import React, { useState } from 'react';
import Button from '../../button/Button';
import Overlay from '../../overlay/Overlay';
import './Modal.sass';
import CloseIcon from '../../../assets/close-icon.svg';

export default function Modal({ children, closeModal }: any) {
  return (
    <Overlay>
      <div className='modal'>
        <div className='close-button'>
          <Button onClick={() => closeModal()} type='icon'>
            <img src={CloseIcon}></img>
          </Button>
        </div>
        {children}
      </div>
    </Overlay>
  );
}
