import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Container from '../../../../components/Container';
import { useLoading } from '../../../../hooks/loading';
import api from '../../../../services/api';
import { FormCategory } from '../components/Form';
import { apiList } from '../domain/api';
import { nameActions, namePageTitle } from '../domain/info';
import { breadcrumbUpdate } from '../domain/breadcrumb';
import { toolsUpdate } from '../domain/tools';

const ProductAtributeUpdate = (): JSX.Element => {
  const { location } = useHistory<{
    id: string;
    value: string;
  }>();
  const { id } = useParams<{ id: string }>();
  const { activeLoading, disableLoading } = useLoading();
  const [categoryItem, setCategoryItem] = useState<{
    id: string;
    name: string;
  }>({ id: '', name: '' });

  useEffect(() => {
    async function loadData() {
      activeLoading();
      const response = await api.get(apiList(id));
      const { data } = response;
      setCategoryItem({ id: data.id, name: data.name });
      disableLoading();
    }
    loadData();
  }, []);
  return (
    <Container
      pageTitle={namePageTitle}
      portletTitle={nameActions.update.name}
      breadcrumb={breadcrumbUpdate}
      tools={[
        toolsUpdate({
          id: location.state.id,
          value: location.state.value,
        }),
      ]}
    >
      <div className="form-body">
        <FormCategory
          valueInput={categoryItem.name}
          typeForm={{
            idUpdate: Number(categoryItem.id),
            inputValue: categoryItem.name,
          }}
        />
      </div>
    </Container>
  );
};

export default ProductAtributeUpdate;
