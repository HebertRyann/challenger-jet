export const apiCreate = (): string => '/productAttributes/'
export const apiList = (id?: string): string =>
  !id ? '/productAttributes/' : `/productAttributes/view/${id}`
export const apiUpdate = (id: string): string =>
  `/productAttributes/update/${id}`
export const apiDelete = (id: string): string => `/productAttributes/${id}`
