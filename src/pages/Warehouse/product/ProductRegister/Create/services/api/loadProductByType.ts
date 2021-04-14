import api from '../../../../../../../services/api';

type SaveProductParams = {
  id: string;
  name: string;
};

export const loadProductByType = async (
  type: string,
): Promise<SaveProductParams[]> => {
  const { data } = await api.get<SaveProductParams[]>(`/product/type/${type}`);

  return data;
};
