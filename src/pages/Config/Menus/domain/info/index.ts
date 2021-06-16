type TypeActionNameWithTo = {
  name: string
  to: string
  icon: string
}

type PortletTitleCrudType = {
  create: TypeActionNameWithTo
  read: TypeActionNameWithTo
  update: TypeActionNameWithTo
  delete: TypeActionNameWithTo
}

const nameEntity = 'Menu'
const nameSource = 'menus'
const namePageTitle = 'Menus'

const nameActionPageMain: TypeActionNameWithTo = {
  name: 'Menus',
  to: '/menus',
  icon: ''
}

const nameActions: PortletTitleCrudType = {
  create: {
    name: 'Adicionar',
    to: '/menus/create/',
    icon: 'fa fa-plus'
  },
  read: {
    name: 'Visualizar',
    to: '/menus/',
    icon: 'fa fa-list'
  },
  update: {
    name: 'Editar',
    to: '/menus/update/',
    icon: 'fa fa-edit'
  },
  delete: {
    name: 'Remover',
    to: '#!',
    icon: 'fa fa-remove'
  }
}

export {
  nameEntity,
  nameSource,
  namePageTitle,
  nameActionPageMain,
  nameActions
}
