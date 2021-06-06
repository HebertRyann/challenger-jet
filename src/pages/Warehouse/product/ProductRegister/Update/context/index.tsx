import React from 'react'
import { HasVariationProvider } from './HasVariation'

type TypeProductProvider = {
  children: JSX.Element
}

export const ProductProvider = ({
  children
}: TypeProductProvider): JSX.Element => {
  return <HasVariationProvider>{children}</HasVariationProvider>
}
