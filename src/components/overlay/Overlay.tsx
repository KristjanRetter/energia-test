import React from 'react';
import './Overlay.sass';

interface OverlayProps {
  children: React.ReactNode;
}

export default function Overlay({ children }: OverlayProps): React.FunctionComponentElement<OverlayProps> {
  return (
    <>
      <div className='overlay-content'>{children}</div>
      <div className='overlay'></div>
    </>
  );
}
