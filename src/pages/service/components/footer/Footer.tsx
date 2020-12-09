import React, { useContext, useEffect } from 'react';
import Button from '../../../../components/button/Button';
import './Footer.sass';
import { AppContext } from '../../../../common/AppContext';

export default function Footer({ children, total }: any) {
  return (
    <footer className='footer'>
      <span className='price'>Total: {total} €</span>
      <div className='buttons'>{children}</div>
    </footer>
  );
}
