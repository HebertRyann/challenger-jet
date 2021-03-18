import React from 'react';
import { FormCategory } from '../components/Form';
import Container, {
  ToolsContainerProps,
} from '../../../../components/Container';
import {
  namePageTitle,
  nameActions,
  nameActionPageMain,
} from '../domain/info';

const ProductAtributesCreate = (): JSX.Element => {
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
      to: nameActionPageMain.to,
    },
    {
      name: nameActions.create.name,
    },
  ];
  const tools: Array<ToolsContainerProps> = [
    {
      name: nameActions.read.name,
      to: nameActions.read.to,
      icon: nameActions.read.icon,
      modal: false,
      hasParams: false,
    },
  ];

  return (
    <Container
      pageTitle={namePageTitle}
      portletTitle={nameActions.create.name}
      breadcrumb={breadcrumb}
      tools={tools}
    >
      <div className="form-body">
        <FormCategory typeForm="create" />
      </div>
    </Container>
  );
};

export default ProductAtributesCreate;
