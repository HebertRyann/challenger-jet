import React from 'react';
import Container from '../../../../components/Container';
import { FormCategory } from '../components/Form';
import { namePageTitle, nameActions } from '../domain/info';
import { breadcrumbCreate } from '../domain/breadcrumb/create';
import { toolsCreate } from '../domain/tools/create';

const ProductAtributesCreate = (): JSX.Element => (
  <Container
    pageTitle={namePageTitle}
    portletTitle={nameActions.create.name}
    breadcrumb={breadcrumbCreate}
    tools={toolsCreate}
  >
    <div className="form-body">
      <FormCategory typeForm="create" />
    </div>
  </Container>
);

export default ProductAtributesCreate;
