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

const nameEntity = 'User'
const nameSource = 'users'
const namePageTitle = 'Usuários'

const nameActionPageMain: TypeActionNameWithTo = {
  name: 'Usuários',
  to: '/users',
  icon: ''
}

const nameActions: PortletTitleCrudType = {
  create: {
    name: 'Adicionar',
    to: '/users/create/',
    icon: 'fa fa-plus'
  },
  read: {
    name: 'Visualizar',
    to: '/users/',
    icon: 'fa fa-list'
  },
  update: {
    name: 'Editar',
    to: '/users/update/',
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
