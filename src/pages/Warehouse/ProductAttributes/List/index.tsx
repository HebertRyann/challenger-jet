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
import { breadcrumbList } from "../domain/breadcrumb";

const ProductAtributesList: React.FC = () => {


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
      breadcrumb={breadcrumbList}
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
