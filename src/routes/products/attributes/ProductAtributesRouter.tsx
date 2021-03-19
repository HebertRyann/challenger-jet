import React from 'react';
import List from '../../../pages/Warehouse/ProductAttributes/List';
import Update from '../../../pages/Warehouse/ProductAttributes/Update';
import Create from '../../../pages/Warehouse/ProductAttributes/Create';
import View from '../../../pages/Warehouse/ProductAttributes/View';
import Route from '../../Route';

export const ProductAttributesRouter = (): JSX.Element => (
  <>
    <Route path="/productAttributes" exact component={List} isPrivate />
    <Route path="/productAttributes/update/:id" component={Update} isPrivate />
    <Route path="/productAttributes/create" component={Create} isPrivate />
    <Route path="/productAttributes/view/:id" component={View} isPrivate />
  </>
);
