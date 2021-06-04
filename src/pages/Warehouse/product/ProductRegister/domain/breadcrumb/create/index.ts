import { nameActions } from '../../info'
import { TypeBreadcrumb } from '../index'

export const breadcrumbCreate: TypeBreadcrumb[] = [
  {
    name: 'Início',
    to: '/'
  },
  {
    name: 'Almoxarifado'
  },
  {
    name: 'Produtos'
  },
  {
    name: nameActions.create.name
  }
]
