type TypeActionNameWithTo = {
  name: string;
  to: string;
  icon: string;
};

type PortletTitleCrudType = {
  create: TypeActionNameWithTo;
  read: TypeActionNameWithTo;
  update: TypeActionNameWithTo;
  delete: TypeActionNameWithTo;
};

const nameEntity = 'FinancialCategory';
const nameSource = 'FinancialCategories';
const namePageTitle = 'Lista de categoria';

const nameActionPageMain: TypeActionNameWithTo = {
  name: 'Lista de categoria',
  to: '/financialCategories',
  icon: '',
};

const nameActions: PortletTitleCrudType = {
  create: {
    name: 'Adicionar',
    to: '/financialCategories/create/',
    icon: 'fa fa-plus',
  },
  read: {
    name: 'Listagem',
    to: '/financialCategories/',
    icon: 'fa fa-list',
  },
  update: {
    name: 'Atualizar',
    to: '/financialCategories/update/',
    icon: 'fa fa-edit',
  },
  delete: {
    name: 'Remover',
    to: '#!',
    icon: 'fa fa-remove',
  },
};

export {
  nameEntity,
  nameSource,
  namePageTitle,
  nameActionPageMain,
  nameActions,
};
