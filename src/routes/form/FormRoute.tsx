import React from 'react'
import { Route } from 'react-router-dom'
import { CreateProductPage } from '../../pages/Warehouse/product/ProductRegister_temp/presentation/pages/create'

export const Form = (): JSX.Element => (
  <>
    <Route path="/form" exact component={CreateProductPage} isPrivate />
  </>
)
