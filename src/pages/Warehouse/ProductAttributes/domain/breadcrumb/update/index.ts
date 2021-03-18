import { nameActionPageMain, nameActions } from '../../info';

export const breadcrumbUpdate: Array<any> = [
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
    name: nameActionPageMain.name,
    to: nameActionPageMain.to,
  },
  {
    name: nameActions.read.name,
  },
];
