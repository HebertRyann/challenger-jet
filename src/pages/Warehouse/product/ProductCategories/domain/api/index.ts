export const apiCreate = (): string => '/productCategories/';
export const apiList = (id?: string): string =>
  !id ? '/productCategories/' : `/productCategories/view/${id}`;
export const apiUpdate = (id: string): string =>
  `/productCategories/update/${id}`;
export const apiDelete = (id: string): string => `/productCategories/${id}`;
