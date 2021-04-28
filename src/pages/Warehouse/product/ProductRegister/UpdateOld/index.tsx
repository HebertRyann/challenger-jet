import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoading } from '../../../../../hooks/loading';
import { ProductListResponse } from '../Update/domain/ProductListResponse';
import { listById } from '../domain/api';
import api from '../../../../../services/api';

const ProductAtributeUpdate = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { activeLoading, disableLoading } = useLoading();
  const [product, setProduct] = useState<ProductListResponse>();

  useEffect(() => {
    (async () => {
      activeLoading();
      const { data } = await api.get<ProductListResponse>(listById(id));
      console.log(data);
      disableLoading();
    })();
  }, []);
  return <h1>{id}</h1>;
};

export default ProductAtributeUpdate;
