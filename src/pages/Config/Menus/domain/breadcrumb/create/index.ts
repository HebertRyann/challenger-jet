import { nameActions, nameActionPageMain } from '../../info'
import { TypeBreadcrumb } from '../index'

export const breadcrumbCreate: TypeBreadcrumb[] = [
  {
    name: 'Início',
    to: '/'
  },
  {
    name: 'Configuração'
  },
  {
    name: nameActionPageMain.name,
    to: nameActionPageMain.to
  },
  {
    name: nameActions.create.name
  }
]
