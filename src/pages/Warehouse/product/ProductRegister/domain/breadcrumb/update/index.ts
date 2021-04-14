import { nameActionPageMain, nameActions } from '../../info';
import { TypeBreadcrumb } from '..';

export const breadcrumbUpdate: TypeBreadcrumb[] = [
  {
    name: 'Início',
    to: '/',
  },
  {
    name: 'Almoxarifado',
  },
  {
    name: 'Produtos',
  },
  {
    name: nameActions.read.name,
  },
];
