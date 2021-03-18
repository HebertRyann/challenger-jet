import React from 'react';
import ProductCategoriesList from '../../../pages/Warehouse/ProductCategories/List';
import ProductCategoriesUpdate from '../../../pages/Warehouse/ProductCategories/Update';
import ProductCategoriesCreate from '../../../pages/Warehouse/ProductCategories/Create';
import ProductCategoriesView from '../../../pages/Warehouse/ProductCategories/View';
import Route from '../../Route';

export const ProductCategoriesRouter = (): JSX.Element => (
  <>
    <Route
      path="/productCategories"
      exact
      component={ProductCategoriesList}
      isPrivate
    />
    <Route
      path="/productCategories/create"
      component={ProductCategoriesCreate}
      isPrivate
    />
    <Route
      path="/productCategories/view/:id"
      component={ProductCategoriesView}
      isPrivate
    />
    <Route
      path="/productCategories/update/:id"
      component={ProductCategoriesUpdate}
      isPrivate
    />
  </>
);
