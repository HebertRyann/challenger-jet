import React from 'react';
import { FormCategory } from '../components/Form';
import Container, {
  ToolsContainerProps,
} from '../../../../components/Container';

export interface ProductCategoryFormData {
  parent_id?: number;
  name: string;
}

const ProductCategoriesCreate: React.FC = () => {
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
      name: 'Categorias',
      to: '/productCategories',
    },
    {
      name: 'Adicionar',
    },
  ];
  const tools: Array<ToolsContainerProps> = [
    {
      name: 'Listar',
      to: '/productCategories',
      icon: 'fa fa-list',
      modal: false,
      hasParams: false,
    },
  ];

  return (
    <Container
      pageTitle="Categorias de produtos"
      portletTitle="Adicionar"
      breadcrumb={breadcrumb}
      tools={tools}
    >
      <FormCategory typeForm="create" />
    </Container>
  );
};

export default ProductCategoriesCreate;
