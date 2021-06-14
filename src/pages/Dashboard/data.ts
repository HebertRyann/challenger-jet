import {
  faCheck,
  faSearch,
  faForward,
  faCubes,
  faCube,
  faSync,
  faEnvelopeOpenText,
  faShippingFast,
  faUserCog,
  faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons'

export const controlsData = [
  {
    name: 'ALMOXARIFADO',
    items: [
      {
        number: 0,
        text: 'separar pedido',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: 'financialCategories',
        icon: faForward
      },
      {
        number: 0,
        text: 'separar requisição',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: 'financialCategories',
        icon: faEnvelopeOpenText
      },
      {
        number: 0,
        text: 'estoque',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: 'financialCategories',
        icon: faCube
      },
      {
        number: 0,
        text: 'produtos em estoque',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: 'financialCategories',
        icon: faCubes
      }
    ]
  },
  {
    name: 'EXPEDIÇÃO',
    items: [
      {
        number: 0,
        text: 'conferência',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: 'financialCategories',
        icon: faSearch
      },
      {
        number: 0,
        text: 'aguardando coleta',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: 'financialCategories',
        icon: faSync
      },
      {
        number: 0,
        text: 'pedido coletado',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: 'financialCategories',
        icon: faCheck
      }
    ]
  },
  {
    name: 'RECEBIMENTO',
    items: [
      {
        number: 0,
        text: 'aguardando compra',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: 'financialCategories',
        icon: faMoneyBillWave
      },
      {
        number: 0,
        text: 'aguardando frete',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: 'financialCategories',
        icon: faShippingFast
      },
      {
        number: 0,
        text: 'aguardando serviço',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: 'financialCategories',
        icon: faUserCog
      }
    ]
  }
]
