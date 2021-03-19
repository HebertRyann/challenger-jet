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

const nameEntity = 'ProductUnitMeasured';
const nameSource = 'productUnitMeasured';
const namePageTitle = 'Unidades de medidas dos produtos';

const nameActionPageMain: TypeActionNameWithTo = {
  name: 'Categorias',
  to: '/productUnitMeasured',
  icon: '',
};

const nameActions: PortletTitleCrudType = {
  create: {
    name: 'Adicionar',
    to: '/productUnitMeasured/create/',
    icon: 'fa fa-plus',
  },
  read: {
    name: 'Visualizar',
    to: '/productUnitMeasured/',
    icon: 'fa fa-list',
  },
  update: {
    name: 'Atualizar',
    to: '/productUnitMeasured/update/',
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
