import React from 'react';
import Container from '../../../../components/Container';
import DataTable from '../../../../components/DataTable';
import {
  nameEntity,
  namePageTitle,
  nameActions,
  nameSource,
} from '../domain/info';
import { headers } from '../domain/headers';
import { breadcrumbList } from '../domain/breadcrumb';
import { toolsList } from '../domain/tools';

const ProductAtributesList = (): JSX.Element => (
  <Container
    pageTitle={namePageTitle}
    portletTitle={nameActions.read.name}
    breadcrumb={breadcrumbList}
    tools={[toolsList]}
  >
    <DataTable
      source={nameSource}
      entity={nameEntity}
      notHasChildren
      headers={headers}
    />
  </Container>
);

export default ProductAtributesList;
