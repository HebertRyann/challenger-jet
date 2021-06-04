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

const nameEntity = 'ProductAttribute'
const nameSource = 'ProductAttributes'
const namePageTitle = 'Atributos de produto'

const nameActionPageMain: TypeActionNameWithTo = {
  name: 'Atributos',
  to: '/productAttributes',
  icon: ''
}

const nameActions: PortletTitleCrudType = {
  create: {
    name: 'Adicionar',
    to: '/productAttributes/create/',
    icon: 'fa fa-plus'
  },
  read: {
    name: 'Visualizar',
    to: '/productAttributes/',
    icon: 'fa fa-list'
  },
  update: {
    name: 'Atualizar',
    to: '/productAttributes/update/',
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
