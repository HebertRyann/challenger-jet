import { nameActions, nameActionPageMain } from '../../info'
import { TypeBreadcrumb } from '../index'

export const breadcrumbCreate: TypeBreadcrumb[] = [
  {
    name: 'Início',
    to: '/'
  },
  {
    name: 'Administrativo'
  },
  {
    name: nameActionPageMain.name,
    to: nameActionPageMain.to
  },
  {
    name: nameActions.create.name
  }
]
