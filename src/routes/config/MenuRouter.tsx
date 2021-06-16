import React from 'react'
import List from '../../pages/Config/Menus/List'
import Update from '../../pages/Config/Menus/Update'
import Create from '../../pages/Config/Menus/Create'
import View from '../../pages/Config/Menus/View'
import Route from '../Route'

export const MenuRouter = (): JSX.Element => (
  <>
    <Route path="/menus" exact component={List} isPrivate />
    <Route path="/menus/update/:id" component={Update} isPrivate />
    <Route path="/menus/create" component={Create} isPrivate />
    <Route path="/menus/view/:id" component={View} isPrivate />
  </>
)
