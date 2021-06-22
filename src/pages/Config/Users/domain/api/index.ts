export const apiCreate = (): string => '/users/'
export const apiList = (id?: string): string =>
  !id ? '/users/' : `/users/view/${id}`
export const apiUpdate = (id: string): string => `/users/update/${id}`
export const apiDelete = (id: string): string => `/users/${id}`
