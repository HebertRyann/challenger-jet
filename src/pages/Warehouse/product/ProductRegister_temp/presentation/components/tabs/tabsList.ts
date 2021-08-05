import { TabsModel } from '../../../domain/models/tabs'

export const tabsList: TabsModel[] = [
  {
    name: 'overview',
    label: 'Dados',
    isEnable: true,
    isDefault: true
  },
  {
    name: 'details',
    label: 'Detalhes',
    isEnable: true
  },
  {
    name: 'stock',
    label: 'Estoque',
    isEnable: true
  },
  {
    name: 'hasVariation',
    label: 'Variação',
    isEnable: false
  }
]
