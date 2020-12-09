import React from 'react';
import './Overlay.sass';

export default function Overlay({ children }: any) {
  return (
    <>
      <div className='overlay-content'>{children}</div>
      <div className='overlay'></div>
    </>
  );
}
