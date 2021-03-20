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

const nameEntity = 'ProductAttribute';
const nameSource = 'Product';
const namePageTitle = 'Cadastro de produtos';

const nameActionPageMain: TypeActionNameWithTo = {
  name: 'Cadastro',
  to: '/productRegister',
  icon: '',
};

const nameActions: PortletTitleCrudType = {
  create: {
    name: 'Adicionar',
    to: '/productRegister/create/',
    icon: 'fa fa-plus',
  },
  read: {
    name: 'Listagem',
    to: '/productRegister/',
    icon: 'fa fa-list',
  },
  update: {
    name: 'Atualizar',
    to: '/productRegister/update/',
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
