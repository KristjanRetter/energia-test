import React, { ReactChild } from 'react';
import './Header.sass';

interface HeaderProps {
  title: string;
  description: string;
  children: ReactChild;
}

export default function Header({ title, description, children }: HeaderProps) {
  return (
    <header className='header'>
      <div>
        <h1 className='title'>{title}</h1>
        <p>{description}</p>
      </div>
      <div>{children}</div>
    </header>
  );
}
