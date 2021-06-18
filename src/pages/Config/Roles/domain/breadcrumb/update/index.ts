import { nameActionPageMain, nameActions } from '../../info'
import { TypeBreadcrumb } from '..'

export const breadcrumbUpdate: TypeBreadcrumb[] = [
  {
    name: 'Início',
    to: '/'
  },
  {
    name: 'Configurações'
  },
  {
    name: nameActionPageMain.name,
    to: nameActionPageMain.to
  },
  {
    name: nameActions.read.name
  }
]
