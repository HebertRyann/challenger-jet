export type TypeProduct = {
  id: number;
  name: string;
};

export const formatProductTypeToLowerCase = (
  product:
    | typeof RAW_MATERIAL
    | typeof SEMI_FINISHED
    | typeof SALE
    | typeof RE_SALE
    | typeof LOCATION
    | typeof CONSUMER,
) => {
  return product.name.replace(' ', '-').toLowerCase();
};

const formatProductTypeUppercase = (product: string) => {
  return product.replace('-', ' ').toLocaleLowerCase();
};

export const RAW_MATERIAL: TypeProduct = {
  id: 1,
  name: 'Materia prima',
};

export const SEMI_FINISHED: TypeProduct = {
  id: 2,
  name: 'Semi acabado',
};

export const SALE: TypeProduct = {
  id: 3,
  name: 'Venda',
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
  CONSUMER,
  LOCATION,
  RAW_MATERIAL,
  RE_SALE,
  SEMI_FINISHED,
  SALE,
];
