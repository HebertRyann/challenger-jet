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

const nameEntity = 'FinancialCategory'
const nameSource = 'FinancialCategories'
const namePageTitle = 'Categorias financeira'

const nameActionPageMain: TypeActionNameWithTo = {
  name: 'Categorias financeira',
  to: '/financialCategories',
  icon: ''
}

const nameActions: PortletTitleCrudType = {
  create: {
    name: 'Adicionar',
    to: '/financialCategories/create/',
    icon: 'fa fa-plus'
  },
  read: {
    name: 'Visualizar',
    to: '/financialCategories/',
    icon: 'fa fa-list'
  },
  update: {
    name: 'Editar',
    to: '/financialCategories/update/',
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
