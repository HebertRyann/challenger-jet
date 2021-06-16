import React from 'react'
import Container from '../../../../components/Container'
import { FormMenu } from '../components/Form'
import { namePageTitle, nameActions } from '../domain/info'
import { breadcrumbCreate } from '../domain/breadcrumb'
import { toolsCreate } from '../domain/tools/create'

const MenuCreate = (): JSX.Element => (
  <Container
    pageTitle={namePageTitle}
    portletTitle={nameActions.create.name}
    breadcrumb={breadcrumbCreate}
    tools={[toolsCreate]}
  >
    <div className="form-body">
      <FormMenu typeForm="create" />
    </div>
  </Container>
)

export default MenuCreate
