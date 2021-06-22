import React from 'react'
import Container from '../../../../components/Container'
import { FormUser } from '../components/Form'
import { namePageTitle, nameActions } from '../domain/info'
import { breadcrumbCreate } from '../domain/breadcrumb'
import { toolsCreate } from '../domain/tools/create'

const UserCreate = (): JSX.Element => (
  <Container
    pageTitle={namePageTitle}
    portletTitle={nameActions.create.name}
    breadcrumb={breadcrumbCreate}
    tools={[toolsCreate]}
  >
    <div className="form-body">
      <FormUser typeForm="create" />
    </div>
  </Container>
)

export default UserCreate
