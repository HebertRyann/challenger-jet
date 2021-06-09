import React from 'react'
import List from '../../../pages/Administrative/FinancialCategory/List'
import Update from '../../../pages/Administrative/FinancialCategory/Update'
import Create from '../../../pages/Administrative/FinancialCategory/Create'
import View from '../../../pages/Administrative/FinancialCategory/View'
import Route from '../../Route'

export const FinancialCategoriesRouter = (): JSX.Element => (
  <>
    <Route path="/financialCategories" exact component={List} isPrivate />
    <Route
      path="/financialCategories/update/:id"
      component={Update}
      isPrivate
    />
    <Route path="/financialCategories/create" component={Create} isPrivate />
    <Route path="/financialCategories/view/:id" component={View} isPrivate />
  </>
)
