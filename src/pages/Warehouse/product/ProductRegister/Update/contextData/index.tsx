import React from 'react';
import { ProviderProduct } from './context';

type TypeProductProvider = {
  children: JSX.Element;
};

export const ProductProvider = ({ children }: TypeProductProvider) => {
  return <ProviderProduct>{children}</ProviderProduct>;
};
