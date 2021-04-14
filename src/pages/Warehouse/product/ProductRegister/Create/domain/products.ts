export type TypeProduct = {
  id: number;
  name: string;
  format: (produc: typeof RAW_MATERIAL | typeof SEMI_FINISHED) => string;
};

const format = (
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
  format,
};

export const SEMI_FINISHED: TypeProduct = {
  id: 2,
  name: 'Semi acabado',
  format,
};

export const SALE: TypeProduct = {
  id: 3,
  name: 'Venda',
  format,
};

export const RE_SALE: TypeProduct = {
  id: 4,
  name: 'Revenda',
  format,
};

export const LOCATION: TypeProduct = {
  id: 5,
  name: 'Locação',
  format,
};

export const CONSUMER: TypeProduct = {
  id: 6,
  name: 'Consumo',
  format,
};

export const typeProducts: TypeProduct[] = [
  RAW_MATERIAL,
  SALE,
  SEMI_FINISHED,
  RE_SALE,
  LOCATION,
  CONSUMER,
];
