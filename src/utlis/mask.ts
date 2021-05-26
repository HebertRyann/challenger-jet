export function numericMask(value: string) {
  if (!value) {
    let newvalue = value?.replace(/\D/g, '');
    newvalue = newvalue?.replace(/(\d{2})$/, ',$1');
    newvalue = newvalue?.replace(/(\d+)(\d{3},\d{2})$/g, '$1.$2');
    const qtdLoop = (newvalue?.length - 3) / 3;
    let count = 0;
    while (qtdLoop > count) {
      count++;
      newvalue = newvalue?.replace(/(\d+)(\d{3}.*)/, '$1.$2');
    }
    newvalue = newvalue?.replace(/^(0)(\d)/g, '$2');
    return newvalue;
  }
  return value;
}

export const convertValueWithMaskInNumber = (value: string): string => {
  return value;
};

export function weightMask(value: string): string {
  let newValue = value;
  const integer = newValue.split('.')[0];

  newValue = newValue.replace(/\D/g, '');

  newValue = newValue.replace(/^[0]+/, '');

  if (newValue.length <= 3 || !integer) {
    if (newValue.length === 1) newValue = '0,00' + newValue;

    if (newValue.length === 2) newValue = '0,0' + newValue;

    if (newValue.length === 3) newValue = '0,' + newValue;
  } else {
    newValue = newValue.replace(/^(\d{1,})(\d{3})$/, '$1,$2');
  }

  return newValue;
}

export function genericMaskWithTwoZero(value: string): string {
  let newValue = value;
  const integer = newValue?.split('.')[0];

  newValue = newValue?.replace(/\D/g, '');

  newValue = newValue?.replace(/^[0]+/, '');

  if (newValue?.length <= 2 || !integer) {
    if (newValue?.length === 1) newValue = '0,0' + newValue;

    if (newValue?.length === 2) newValue = '0,' + newValue;
  } else {
    newValue = newValue?.replace(/^(\d{1,})(\d{2})$/, '$1,$2');
  }

  return newValue;
}

export function convertValueMaskInNumberWithTwoZero(value: string): number {
  let newValue = value.replace('.', '').replace(',', '');
  const integer = newValue.split('.')[0];

  newValue = newValue.replace(/\D/g, '');

  newValue = newValue.replace(/^[0]+/, '');

  if (newValue.length <= 2 || !integer) {
    if (newValue.length === 1) newValue = '0,0' + newValue;

    if (newValue.length === 2) newValue = '0,' + newValue;
  } else {
    newValue = newValue.replace(/^(\d{1,})(\d{2})$/, '$1,$2');
  }
  newValue = newValue.replace(',', '.');

  return parseFloat(newValue);
}

export function convertValueMaskInNumber(value: string): number {
  let newValue = value;
  const integer = newValue.split('.')[0];

  newValue = newValue.replace(/\D/g, '');

  newValue = newValue.replace(/^[0]+/, '');

  if (newValue.length <= 3 || !integer) {
    if (newValue.length === 1) newValue = '0,00' + newValue;

    if (newValue.length === 2) newValue = '0,0' + newValue;

    if (newValue.length === 3) newValue = '0,' + newValue;
  } else {
    newValue = newValue.replace(/^(\d{1,})(\d{3})$/, '$1,$2');
  }
  newValue = newValue.replace(',', '.');

  return parseFloat(newValue);
}
