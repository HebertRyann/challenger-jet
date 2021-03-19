import React from 'react';
import List from '../../../pages/Warehouse/ProductUnitMeasured/List';
import Update from '../../../pages/Warehouse/ProductUnitMeasured/Update';
import Create from '../../../pages/Warehouse/ProductUnitMeasured/Create';
import View from '../../../pages/Warehouse/ProductUnitMeasured/View';
import Route from '../../Route';

export const ProductUnitMeasuredRouter = (): JSX.Element => (
  <>
    <Route path="/productUnitMeasured" exact component={List} isPrivate />
    <Route
      path="/productUnitMeasured/update/:id"
      component={Update}
      isPrivate
    />
    <Route path="/productUnitMeasured/create" component={Create} isPrivate />
    <Route path="/productUnitMeasured/view/:id" component={View} isPrivate />
  </>
);
