import React from 'react'
import Route from '../Route'
import { CreateProductPage } from '../../pages/Warehouse/product/ProductRegister_temp/pages/create'
import ListProductPage from '../../pages/Warehouse/product/ProductRegister_temp/pages/List'
import { UpdateProductPage } from '../../pages/Warehouse/product/ProductRegister_temp/pages/update'
import ViewProductPage from '../../pages/Warehouse/product/ProductRegister_temp/pages/View'

export const Form = (): JSX.Element => (
  <>
    <Route path="/form" exact component={ListProductPage} isPrivate />
    <Route path="/form/create" component={CreateProductPage} isPrivate />
    <Route path="/form/update/:id" component={UpdateProductPage} isPrivate />
    <Route path="/form/view/:id" component={ViewProductPage} isPrivate />
  </>
)
