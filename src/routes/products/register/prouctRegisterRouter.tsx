import React from 'react'
// import ProductRegisterList from '../../../pages/Warehouse/product/ProductRegister/List'
// import ProductRegisterUpdate from '../../../pages/Warehouse/product/ProductRegister/Update'
// import ProductRegisterCreate from '../../../pages/Warehouse/product/ProductRegister/Create'
// import ProductRegisterView from '../../../pages/Warehouse/product/ProductRegister/View'
import { CreateProductPage } from '../../../pages/Warehouse/product/ProductRegister/presentation/create/index'
import Route from '../../Route'

const Render = (): JSX.Element => <h1>Render</h1>

export const ProductRegisterRouter = (): JSX.Element => (
  <>
    <Route path="/products" exact component={CreateProductPage} isPrivate />
    <Route path="/products/create" component={Render} isPrivate />
    <Route path="/products/view/:id" component={Render} isPrivate />
    <Route path="/products/update/:id" component={Render} isPrivate />
  </>
)
