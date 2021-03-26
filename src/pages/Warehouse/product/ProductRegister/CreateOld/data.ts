type Faker = {
  name: string;
  children: { name: string }[];
};

export const fakeCatetory: Faker[] = [
  {
    name: '1',
    children: [
      {
        name: '2',
      },
      {
        name: '3',
      },
    ],
  },
  {
    name: '4',
    children: [
      {
        name: '5',
      },
    ],
  },
  {
    name: '6',
    children: [],
  },
  {
    name: '7',
    children: [],
  },
  {
    name: '8',
    children: [],
  },
  {
    name: '9',
    children: [],
  },
];

export const fakeFinancy = [
  {
    name: 'Finance 1',
    children: [
      {
        name: 'SubFinance 1',
      },
      {
        name: 'SubFinance 2',
      },
      {
        name: 'SubFinance 3',
      },
      {
        name: 'SubFinance 4',
      },
      {
        name: 'SubFinance 5',
      },
    ],
  },
  {
    name: 'Finance 2',
    children: [
      {
        name: 'SubFinance 1',
      },
      {
        name: 'SubFinance 2',
      },
      {
        name: 'SubFinance 3',
      },
      {
        name: 'SubFinance 4',
      },
      {
        name: 'SubFinance 5',
      },
    ],
  },
  {
    name: 'Finance 3',
    children: [
      {
        name: 'SubFinance 1',
      },
      {
        name: 'SubFinance 2',
      },
      {
        name: 'SubFinance 3',
      },
      {
        name: 'SubFinance 4',
      },
      {
        name: 'SubFinance 5',
      },
    ],
  },
  {
    name: 'Finance 4',
    children: [
      {
        name: 'SubFinance 1',
      },
      {
        name: 'SubFinance 2',
      },
      {
        name: 'SubFinance 3',
      },
      {
        name: 'SubFinance 4',
      },
      {
        name: 'SubFinance 5',
      },
    ],
  },
  {
    name: 'Finance 5',
    children: [
      {
        name: 'SubFinance 1',
      },
      {
        name: 'SubFinance 2',
      },
      {
        name: 'SubFinance 3',
      },
      {
        name: 'SubFinance 4',
      },
      {
        name: 'SubFinance 5',
      },
    ],
  },
  {
    name: 'Finance 6',
    children: [
      {
        name: 'SubFinance 1',
      },
      {
        name: 'SubFinance 2',
      },
      {
        name: 'SubFinance 3',
      },
      {
        name: 'SubFinance 4',
      },
      {
        name: 'SubFinance 5',
      },
    ],
  },
];

type FakerData = {
  id: string;
  name: string;
  parent_id: string | null;
};

export const fakeData: FakerData[] = [
  {
    id: '1',
    name: 'casa',
    parent_id: null,
  },
  {
    id: '2',
    name: 'amarelo',
    parent_id: '1',
  },
  {
    id: '3',
    name: 'abre',
    parent_id: '1',
  },
  {
    id: '4',
    name: 'jogo',
    parent_id: '1',
  },
  {
    id: '5',
    name: 'csc',
    parent_id: null,
  },
  {
    id: '6',
    name: 'controle',
    parent_id: null,
  },
  {
    id: '7',
    name: 'fazer',
    parent_id: null,
  },
];
