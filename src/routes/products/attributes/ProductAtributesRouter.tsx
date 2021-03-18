import React from 'react';
import ProductAttributesList from '../../../pages/Warehouse/ProductAttributes/List';
import ProductAttributesUpdate from '../../../pages/Warehouse/ProductAttributes/Update';
import ProductAttributesCreate from '../../../pages/Warehouse/ProductAttributes/Create';
import ProductAttributesView from '../../../pages/Warehouse/ProductAttributes/View';
import Route from '../../Route';

export const ProductAttributesRouter = (): JSX.Element => (
  <>
    <Route
      path="/ProductAttributes"
      exact
      component={ProductAttributesList}
      isPrivate
    />
    <Route
      path="/ProductAttributes/update/:id"
      component={ProductAttributesUpdate}
      isPrivate
    />
    <Route
      path="/ProductAttributes/create"
      component={ProductAttributesCreate}
      isPrivate
    />
    <Route
      path="/ProductAttributes/view/:id"
      component={ProductAttributesView}
      isPrivate
    />
  </>
);
