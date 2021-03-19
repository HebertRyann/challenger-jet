import React from 'react';
import List from '../../../pages/Warehouse/product/ProductAttributes/List';
import Update from '../../../pages/Warehouse/product/ProductAttributes/Update';
import Create from '../../../pages/Warehouse/product/ProductAttributes/Create';
import View from '../../../pages/Warehouse/product/ProductAttributes/View';
import Route from '../../Route';

export const ProductAttributesRouter = (): JSX.Element => (
  <>
    <Route path="/productAttributes" exact component={List} isPrivate />
    <Route path="/productAttributes/update/:id" component={Update} isPrivate />
    <Route path="/productAttributes/create" component={Create} isPrivate />
    <Route path="/productAttributes/view/:id" component={View} isPrivate />
  </>
);
