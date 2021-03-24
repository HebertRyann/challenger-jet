import api from '../../../../../../services/api';

type CategoryData = {
  id: string;
  name: string;
  parent_id: string;
};

export const loadCategoryData = async (): Promise<CategoryData[]> => {
  const { data, status } = await api.get('/productCategories/');

  console.log(data);

  if (status === 200) {
    return data;
  }
  return [];
};
