import api from '../../../../../../services/api'

export type ProductType = {
  id: string
  name: string
}

export type ProductCategory = {
  id: string
  name: string
  parent_id: string | null
}

export type FinancialCategory = {
  id: string
  name: string
  parent_id: string | null
}

export type Attributes = {
  id: string
  name: string
  parent_id: string | null
  childrenList: Attributes[]
  isChecked?: boolean
}

export type UnitMensured = {
  id: string
  name: string
}

export const loadProductTypes = (): any[] => {
  return [
    { id: 1, name: 'materia-prima', label: 'MATERIA PRIMA' },
    { id: 2, name: 'semi-acabado', label: 'SEMI ACABADO' },
    { id: 3, name: 'venda', label: 'VENDA' },
    { id: 4, name: 'revenda', label: 'REVENDA' },
    { id: 5, name: 'locação', label: 'LOCAÇÃO' },
    { id: 6, name: 'consumo', label: 'USO E CONSUMO' }
  ]
}

export const loadProductCategories = async (): Promise<ProductCategory[]> => {
  const { data, status } = await api.get('productCategories/list/')

  if (status === 200) {
    const resultData: ProductCategory[] = []
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

export const loadFinancialCategories = async (): Promise<
  FinancialCategory[]
> => {
  const { data, status } = await api.get('financialCategories')

  if (status === 200) {
    const resultData: FinancialCategory[] = []
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

export const loadAtributes = async (): Promise<Attributes[]> => {
  const { data, status } = await api.get('productAttributes')
  if (status === 200) {
    const resultData: Attributes[] = []
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

export const loadUnitMensured = async (): Promise<UnitMensured[]> => {
  const { data, status } = await api.get<UnitMensured[]>('productUnitMeasured')
  if (status === 200) {
    const resultData: UnitMensured[] = []
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
