export type TypeICMS = {
  id: number;
  name: string;
};

export const RAW_MATERIAL: TypeICMS = {
  id: 1,
  name: 'Materia prima',
};

export const SEMI_FINISHED: TypeICMS = {
  id: 2,
  name: 'Semi acabado',
};

export const SALE: TypeICMS = {
  id: 3,
  name: 'Venda',
};

export const RE_SALE: TypeICMS = {
  id: 4,
  name: 'Revenda',
};

export const LOCATION: TypeICMS = {
  id: 5,
  name: 'Locação',
};

export const CONSUMER: TypeICMS = {
  id: 6,
  name: 'Consumo',
};

export const dataIcms: TypeICMS[] = [
  RAW_MATERIAL,
  SALE,
  SEMI_FINISHED,
  RE_SALE,
  LOCATION,
  CONSUMER,
];
