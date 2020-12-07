import React, { ReactChild } from 'react';
import './Container.sass';

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className='container'>{children}</div>;
}
