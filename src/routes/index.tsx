import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'
import { SignIn, SignUp, Dashboard } from './users/users-router'
import { ProductCategoriesRouter } from './products/categories/categories-router'
import { ProductAttributesRouter } from './products/attributes/ProductAtributesRouter'
import { ProductUnitMeasuredRouter } from './products/unitMeasured/ProductUnitMeasured'
import { ProductRegisterRouter } from './products/register/prouctRegisterRouter'
import { FinancialCategoriesRouter } from './administrative/financialCategories/FinancialCategoryRouter'
import { MenuRouter } from './config/MenuRouter'
import { RolesRouter } from './config/RolesRouter'
import { UsersRouter } from './config/UsersRouter'

const Routes = (): JSX.Element => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <React.Fragment>
      <ProductAttributesRouter />
      <ProductCategoriesRouter />
      <ProductUnitMeasuredRouter />
      <FinancialCategoriesRouter />
      <ProductRegisterRouter />
      <MenuRouter />
      <RolesRouter />
      <UsersRouter />
    </React.Fragment>
  </Switch>
)
export default Routes
