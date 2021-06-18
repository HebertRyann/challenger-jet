export const apiCreate = (): string => '/roles/'
export const apiList = (id?: string): string =>
  !id ? '/roles/' : `/roles/view/${id}`
export const apiUpdate = (id: string): string => `/roles/update/${id}`
export const apiDelete = (id: string): string => `/roles/${id}`
