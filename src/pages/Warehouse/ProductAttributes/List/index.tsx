import React from 'react';
import Container, {
  ToolsContainerProps,
} from '../../../../components/Container';
import DataTable from '../../../../components/DataTable';
import {
  nameEntity,
  nameActionPageMain,
  namePageTitle,
  nameActions,
  nameSource,
} from '../domain/info';
import { headers } from '../domain/headers';
const ProductAtributesList: React.FC = () => {
  const breadcrumb: Array<any> = [
    {
      name: 'Início',
      to: '/',
    },
    {
      name: 'Almoxarifado',
    },
    {
      name: 'Produtos',
    },
    {
      name: nameActionPageMain.name,
    },
  ];
  const tools: Array<ToolsContainerProps> = [
    {
      name: nameActions.create.name,
      to: nameActions.create.to,
      icon: nameActions.create.icon,
      hasParams: false,
    },
  ];

  return (
    <Container
      pageTitle={namePageTitle}
      portletTitle={nameActions.read.name}
      breadcrumb={breadcrumb}
      tools={tools}
    >
      <DataTable
        source={nameSource}
        entity={nameEntity}
        notHasChildren
        headers={headers}
      />
    </Container>
  );
};

export default ProductAtributesList;
