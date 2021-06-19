import {
  faSearch,
  faCubes,
  faCube,
  faEnvelopeOpenText,
  faShippingFast,
  faEdit,
  faInbox,
  faTruck,
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
        icon: faEnvelopeOpenText
      },
      {
        number: 0,
        text: 'estoque',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: '#',
        icon: faCube
      },
      {
        number: 0,
        text: 'produtos em estoque',
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
        text: 'aguardando compra',
        textFooter: 'pendente',
        valueSubtitleFooter: 0,
        link: '#',
        icon: faTruck
      },
    ]
  },
  {
    name: 'COMPRA',
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
