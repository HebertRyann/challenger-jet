import { nameActionPageMain, nameActions } from '../../info'
import { TypeBreadcrumb } from '..'

export const breadcrumbUpdate: TypeBreadcrumb[] = [
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
    name: nameActions.update.name
  }
]
