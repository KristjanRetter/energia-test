import React from 'react';
import './Container.sass';

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps): React.FunctionComponentElement<ContainerProps> {
  return <div className='container'>{children}</div>;
}
