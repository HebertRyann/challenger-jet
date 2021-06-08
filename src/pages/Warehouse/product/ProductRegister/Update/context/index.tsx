import React from 'react'
import { HasVariationProvider } from './HasVariation'

type TypeProductProvider = {
  children: JSX.Element
}

export const ProductProvider = ({ children }: TypeProductProvider) => {
  return <HasVariationProvider>{children}</HasVariationProvider>
}
