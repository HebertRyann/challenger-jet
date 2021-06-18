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

const nameEntity = 'Role'
const nameSource = 'roles'
const namePageTitle = 'Grupos de Usuário'

const nameActionPageMain: TypeActionNameWithTo = {
  name: 'Grupos de Usuário',
  to: '/roles',
  icon: ''
}

const nameActions: PortletTitleCrudType = {
  create: {
    name: 'Adicionar',
    to: '/roles/create/',
    icon: 'fa fa-plus'
  },
  read: {
    name: 'Visualizar',
    to: '/roles/',
    icon: 'fa fa-list'
  },
  update: {
    name: 'Atualizar',
    to: '/roles/update/',
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
