import React from 'react'
import UsersList from '../../pages/Config/Users/List'
import UsersUpdate from '../../pages/Config/Users/Update'
import UsersCreate from '../../pages/Config/Users/Create'
import UsersView from '../../pages/Config/Users/View'
import Route from '../Route'

export const UsersRouter = (): JSX.Element => (
  <>
    <Route path="/users" exact component={UsersList} isPrivate />
    <Route path="/users/create" component={UsersCreate} isPrivate />
    <Route path="/users/view/:id" component={UsersView} isPrivate />
    <Route path="/users/update/:id" component={UsersUpdate} isPrivate />
  </>
)
