export type TypeProduct = {
  id: number;
  name: string;
  label?: string;
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
  label: 'MATERIA PRIMA'
};

export const SEMI_FINISHED: TypeProduct = {
  id: 2,
  name: 'Semi acabado',
  label: 'SEMI ACABADO'
};

export const SALE: TypeProduct = {
  id: 3,
  name: 'Venda',
  label: 'VENDA'
};

export const RE_SALE: TypeProduct = {
  id: 4,
  name: 'Revenda',
  label: 'REVENDA'

};

export const LOCATION: TypeProduct = {
  id: 5,
  name: 'Locação',
  label: 'LOCAÇÃO'
};

export const CONSUMER: TypeProduct = {
  id: 6,
  name: 'Consumo',
  label: 'USO E CONSUMO'
};

export const typeProducts: TypeProduct[] = [
  LOCATION,
  RAW_MATERIAL,
  RE_SALE,
  SEMI_FINISHED,
  CONSUMER,
  SALE,
];
