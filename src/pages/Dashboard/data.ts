import {
  faSearch,
  faCubes,
  faShippingFast,
  faEdit,
  faInbox,
  faSignInAlt,
  faArchive,
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
        link: '#',
        icon: faInbox
      },
      {
        number: 0,
        text: 'separar requisição',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: '#',
        icon: faArchive
      },
      {
        number: 0,
        text: 'produto sem estoque',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: '#',
        icon: faCubes
      },
      {
        number: 0,
        text: 'reposição de produto',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: '#',
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
        link: '#',
        icon: faSearch
      },
      {
        number: 0,
        text: 'aguardando coleta',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: '#',
        icon: faShippingFast
      },
      {
        number: 0,
        text: 'recebimento de compra',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: '#',
        icon: faSignInAlt
      },
    ]
  },
  {
    name: 'COMPRAS',
    items: [
      {
        number: 0,
        text: 'requisição',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: '#',
        icon: faEdit
      }
    ]
  }
]
