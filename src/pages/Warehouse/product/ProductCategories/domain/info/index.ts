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

const nameEntity = 'ProductCategory';
const nameSource = 'productCategories';
const namePageTitle = 'Categorias de produtos';

const nameActionPageMain: TypeActionNameWithTo = {
  name: 'Categorias',
  to: '/productCategories',
  icon: '',
};

const nameActions: PortletTitleCrudType = {
  create: {
    name: 'Adicionar',
    to: '/productCategories/create/',
    icon: 'fa fa-plus',
  },
  read: {
    name: 'Listagem',
    to: '/productCategories/',
    icon: 'fa fa-list',
  },
  update: {
    name: 'Atualizar',
    to: '/productCategories/update/',
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
