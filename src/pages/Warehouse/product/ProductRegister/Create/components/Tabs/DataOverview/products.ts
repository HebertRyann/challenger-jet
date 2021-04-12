export type TypeProduct = {
  id: number;
  name: string;
};

export const RAW_MATERIAL: TypeProduct = {
  id: 1,
  name: 'Materia prima',
};

export const SALE: TypeProduct = {
  id: 3,
  name: 'Venda',
};

export const SEMI_FINISHED: TypeProduct = {
  id: 2,
  name: 'Semi acabado',
};

export const RE_SALE: TypeProduct = {
  id: 4,
  name: 'Revenda',
};

export const LOCATION: TypeProduct = {
  id: 5,
  name: 'Locação',
};

export const CONSUMER: TypeProduct = {
  id: 6,
  name: 'Consumo',
};

export const typeProducts: TypeProduct[] = [
  RAW_MATERIAL,
  SALE,
  SEMI_FINISHED,
  RE_SALE,
  LOCATION,
  CONSUMER,
];
