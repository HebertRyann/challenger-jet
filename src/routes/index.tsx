import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Dashboard from '../pages/Dashboard';

import ProductCategoriesList from '../pages/Warehouse/ProductCategories/List';
import ProductCategoriesUpdate from '../pages/Warehouse/ProductCategories/Update';
import ProductCategoriesCreate from '../pages/Warehouse/ProductCategories/Create';
import ProductCategoriesView from '../pages/Warehouse/ProductCategories/View';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} isPrivate />

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

    <Route
      path="/productAttributes"
      exact
      component={ProductCategoriesList}
      isPrivate
    />
    <Route
      path="/productAttributes/create"
      component={ProductCategoriesUpdate}
      isPrivate
    />
    <Route
      path="/productAttributes/view/:id"
      component={ProductCategoriesUpdate}
      isPrivate
    />
    <Route
      path="/productAttributes/update/:id"
      component={ProductCategoriesUpdate}
      isPrivate
    />
  </Switch>
);
export default Routes;
