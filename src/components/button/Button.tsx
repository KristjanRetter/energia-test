import React, { ReactChild } from 'react';
import './Button.sass';

interface ButtonProps {
  type?: 'secondary' | 'danger' | 'icon';
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactChild;
}

export default function Button({ type, disabled, onClick, children }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={disabled ? 'button-disabled' : type ? `button-${type}` : 'button'}
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
};
