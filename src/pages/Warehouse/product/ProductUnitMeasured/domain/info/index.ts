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
const namePageTitle = 'Unidades de medida';

const nameActionPageMain: TypeActionNameWithTo = {
  name: 'Unidades de medida',
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
    name: 'Editar',
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
