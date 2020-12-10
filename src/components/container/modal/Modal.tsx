import React from 'react';
import Button from '../../button/Button';
import Overlay from '../../overlay/Overlay';
import './Modal.sass';
import CloseIcon from '../../../assets/close-icon.svg';

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: ModalProps): React.FunctionComponentElement<ModalProps> {
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
