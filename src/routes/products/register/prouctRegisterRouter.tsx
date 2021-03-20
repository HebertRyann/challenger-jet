import React from 'react';
import ProductRegisterList from '../../../pages/Warehouse/product/ProductRegister/List';
import ProductRegisterUpdate from '../../../pages/Warehouse/product/ProductRegister/Update';
import ProductRegisterCreate from '../../../pages/Warehouse/product/ProductRegister/Create';
import ProductRegisterView from '../../../pages/Warehouse/product/ProductRegister/View';
import Route from '../../Route';

export const ProductRegisterRouter = (): JSX.Element => (
  <>
    <Route
      path="/productRegister"
      exact
      component={ProductRegisterList}
      isPrivate
    />
    <Route
      path="/productRegister/create"
      component={ProductRegisterCreate}
      isPrivate
    />
    <Route
      path="/productRegister/view/:id"
      component={ProductRegisterView}
      isPrivate
    />
    <Route
      path="/productRegister/update/:id"
      component={ProductRegisterUpdate}
      isPrivate
    />
  </>
);
