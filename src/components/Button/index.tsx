import React, { ButtonHTMLAttributes } from 'react';

import { Contanier } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Contanier type="button" {...rest}>
    {children}
  </Contanier>
);

export default Button;
