import React from 'react';
import './Footer.sass';

interface FooterProps {
  children: React.ReactNode;
  total: number;
}

export default function Footer({ children, total }: FooterProps): React.FunctionComponentElement<FooterProps> {
  return (
    <footer className='footer'>
      <span className='price'>Total: {total} €</span>
      <div className='buttons'>{children}</div>
    </footer>
  );
}
