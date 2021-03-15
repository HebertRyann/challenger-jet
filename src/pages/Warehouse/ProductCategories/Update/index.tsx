import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Container, {
  ToolsContainerProps,
} from '../../../../components/Container';
import api from '../../../../services/api';
import { FormCategory } from '../components/Form';

const ProductCategoriesUpdate: React.FC = () => {
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
      name: 'Editar',
    },
  ];
  const location = useLocation<{ id: string; value: string }>();
  const { id } = useParams<{ id: string }>();
  const tools: Array<ToolsContainerProps> = [
    {
      name: 'Listar',
      to: '/productCategories',
      icon: 'fa fa-list',
      hasParams: {
        id: location.state.id,
        value: location.state.value,
      },
    },
  ];

  const [categoryItem, setCategoryItem] = useState<{
    id: string;
    name: string;
  }>({ id: '', name: '' });

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/productCategories/view/${id}`);
      const { data } = response;
      setCategoryItem({ id: data.id, name: data.name });
    }

    loadData();
  }, []);
  return (
    <Container
      pageTitle="Categorias de produtos"
      portletTitle="Editar"
      breadcrumb={breadcrumb}
      tools={tools}
    >
      <div className="form-body">
        <FormCategory
          valueInput={categoryItem.name}
          typeForm={{
            idUpdate: Number(location.state.id),
            inputValue: location.state.value,
          }}
        />
      </div>
    </Container>
  );
};

export default ProductCategoriesUpdate;
