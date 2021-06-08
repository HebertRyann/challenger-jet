import { nameActionPageMain, nameActions } from '../../info'
import { TypeBreadcrumb } from '../index'

export const breadcrumbView: TypeBreadcrumb[] = [
  {
    name: 'Início',
    to: '/'
  },
  {
    name: 'Almoxarifado'
  },
  {
    name: nameActionPageMain.name,
    to: nameActionPageMain.to
  },
  {
    name: nameActions.read.name
  }
]
