import React from 'react'
import RolesList from '../../pages/Config/Roles/List'
import RolesUpdate from '../../pages/Config/Roles/Update'
import RolesCreate from '../../pages/Config/Roles/Create'
import RolesView from '../../pages/Config/Roles/View'
import Route from '../Route'

export const RolesRouter = (): JSX.Element => (
  <>
    <Route path="/roles" exact component={RolesList} isPrivate />
    <Route path="/roles/create" component={RolesCreate} isPrivate />
    <Route path="/roles/view/:id" component={RolesView} isPrivate />
    <Route path="/roles/update/:id" component={RolesUpdate} isPrivate />
  </>
)
