export const apiCreate = (): string => '/menus/'
export const apiList = (id?: string): string =>
  !id ? '/menus/' : `/menus/view/${id}`
export const apiUpdate = (id: string): string => `/menus/update/${id}`
export const apiDelete = (id: string): string => `/menus/${id}`
