export const apiCreate = (): string => '/financialCategories/';
export const apiList = (id?: string): string =>
  !id ? '/financialCategories/' : `/financialCategories/view/${id}`;
export const apiUpdate = (id: string): string =>
  `/financialCategories/update/${id}`;
export const apiDelete = (id: string): string => `/financialCategories/${id}`;
