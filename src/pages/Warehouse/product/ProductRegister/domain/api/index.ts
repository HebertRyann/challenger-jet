export const apiCreate = (): string => '/product/';
export const apiList = (id?: string): string =>
  !id ? '/product/' : `/product/view/${id}`;
export const apiUpdate = (id: string): string => `/product/update/${id}`;
export const apiDelete = (id: string): string => `/product/${id}`;
