import { TabsModel } from '../../../domain/models/tabs'

export const tabsList: TabsModel[] = [
  {
    name: 'overview',
    label: 'Dados',
    isEnable: true,
    isDefault: true
  },
  /* {
    name: 'details',
    label: 'Detalhe e Medida',
    isEnable: true
  },
  {
    name: 'priceComposition',
    label: 'Formação de preço',
    isEnable: true
  }, */
  {
    name: 'stock',
    label: 'Estoque',
    isEnable: true
  },
  {
    name: 'hasVariation',
    label: 'Variação/Estoque',
    isEnable: false
  }
  /*   {
    name: 'fiscal',
    label: 'Fiscal',
    isEnable: true
  },
  {
    name: 'hasComposition',
    label: 'Composição',
    isEnable: true
  } */
]
