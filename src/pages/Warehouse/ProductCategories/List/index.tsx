import React from 'react';
import Container, {
  ToolsContainerProps,
} from '../../../../components/Container';
import DataTable from '../../../../components/DataTable';

const ProductCategoriesList: React.FC = () => {
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
    },
  ];
  const tools: Array<ToolsContainerProps> = [
    {
      name: 'Adicionar',
      to: '/productCategories/create',
      icon: 'fa fa-plus',
      hasParams: false,
    },
  ];

  const headers = [
    { name: 'Cód.', field: 'id', sortable: true },
    { name: 'Nome', field: 'name', sortable: true },
    { name: 'Ações', field: 'actions', sortable: false },
  ];

  return (
    <Container
      pageTitle="Categorias de produtos"
      portletTitle="Listagem"
      breadcrumb={breadcrumb}
      tools={tools}
    >
      <DataTable
        source="productCategories"
        entity="ProductCategory"
        notHasChildren
        headers={headers}
      />
    </Container>
  );
};

export default ProductCategoriesList;
