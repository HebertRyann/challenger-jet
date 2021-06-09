import api from '../../../../../../../services/api'

export type ResponseEntityWithIdName = {
  id: string
  name: string
  parent_id: string | null
}

export type ResponseEntiryWithIdNameWithChildren = {
  id: string
  name: string
  parent_id: string | null
  childrenList: ResponseEntiryWithIdNameWithChildren[]
  isChecked?: boolean
}

export type ResponseEntityOnlyIdAndName = {
  id: string
  name: string
}

export const loadCategoryData = async (): Promise<
  ResponseEntityWithIdName[]
> => {
  const { data, status } = await api.get('/productCategories/list/')

  if (status === 200) {
    const resultData: ResponseEntityWithIdName[] = []
    data.map((result: any) =>
      resultData.push({
        id: result.id,
        name: result.name,
        parent_id: result.parent_id
      })
    )
    return resultData
  }
  return []
}

export const loadCategoryFinance = async (): Promise<
  ResponseEntityWithIdName[]
> => {
  const { data, status } = await api.get('/financialCategories')

  if (status === 200) {
    const resultData: ResponseEntityWithIdName[] = []
    data.map((result: any) =>
      resultData.push({
        id: result.id,
        name: result.name,
        parent_id: result.parent_id
      })
    )
    return resultData
  }
  return []
}

export const loadAtributes = async (): Promise<
  ResponseEntiryWithIdNameWithChildren[]
> => {
  const { data, status } = await api.get('/productAttributes')
  if (status === 200) {
    const resultData: ResponseEntiryWithIdNameWithChildren[] = []
    data.map((result: any) =>
      resultData.push({
        id: result.id,
        name: result.name,
        parent_id: result.parent_id,
        childrenList: []
      })
    )
    return resultData
  }
  return []
}

export const loadUnitMensured = async (): Promise<
  ResponseEntityOnlyIdAndName[]
> => {
  const { data, status } = await api.get<ResponseEntityOnlyIdAndName[]>(
    '/productUnitMeasured'
  )
  if (status === 200) {
    const resultData: ResponseEntityOnlyIdAndName[] = []
    data.map((result: any) =>
      resultData.push({
        id: result.id,
        name: result.name
      })
    )
    return resultData
  }
  return []
}
