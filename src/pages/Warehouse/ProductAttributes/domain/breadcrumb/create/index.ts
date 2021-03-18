import { namePageTitle, nameActions, nameActionPageMain } from '../../info';

type TypeBreadcrumb = {
  name: string;
  to?: string;
};

export const breadcrumbCreate: TypeBreadcrumb[] = [
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
    name: nameActions.create.name,
  },
];
