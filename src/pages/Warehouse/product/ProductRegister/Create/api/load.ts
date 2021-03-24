import { stringify } from 'uuid';
import api from '../../../../../../services/api';

type CategoryData = {
  id: string;
  name: string;
  parent_id: string | null;
};

export const loadCategoryData = async (): Promise<CategoryData[]> => {
  const { data, status } = await api.get('/productCategories/list/');

  if (status === 200) {
    const resultData: CategoryData[] = [];
    data.map((result: any) =>
      resultData.push({
        id: result.id,
        name: result.name,
        parent_id: result.parent_id,
      }),
    );
    return resultData;
  }
  return [];
};

export const loadCategoryFinance = async (): Promise<CategoryData[]> => {
  const { data, status } = await api.get('/financialCategories');

  if (status === 200) {
    const resultData: CategoryData[] = [];
    data.map((result: any) =>
      resultData.push({
        id: result.id,
        name: result.name,
        parent_id: result.parent_id,
      }),
    );
    return resultData;
  }
  return [];
};
