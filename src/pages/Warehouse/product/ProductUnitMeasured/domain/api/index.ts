export const apiCreate = (): string => '/productUnitMeasured/'
export const apiList = (id?: string): string =>
  !id ? '/productUnitMeasured/' : `/productUnitMeasured/view/${id}`
export const apiUpdate = (id: string): string =>
  `/productUnitMeasured/update/${id}`
export const apiDelete = (id: string): string => `/productUnitMeasured/${id}`
