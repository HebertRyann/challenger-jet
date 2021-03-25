import { stringify } from 'uuid';
import api from '../../../../../../services/api';

export type ResponseEntiryWithIdName = {
  id: string;
  name: string;
  parent_id: string | null;
};

export const loadCategoryData = async (): Promise<
  ResponseEntiryWithIdName[]
> => {
  const { data, status } = await api.get('/productCategories/list/');

  if (status === 200) {
    const resultData: ResponseEntiryWithIdName[] = [];
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

export const loadCategoryFinance = async (): Promise<
  ResponseEntiryWithIdName[]
> => {
  const { data, status } = await api.get('/financialCategories');

  if (status === 200) {
    const resultData: ResponseEntiryWithIdName[] = [];
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

export const loadAtributes = async (): Promise<ResponseEntiryWithIdName[]> => {
  const { data, status } = await api.get('/productAttributes');

  if (status === 200) {
    const resultData: ResponseEntiryWithIdName[] = [];
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
