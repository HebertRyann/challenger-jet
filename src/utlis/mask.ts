export function numericMask(value: string) {
  let newvalue = value.replace(/\D/g, '');
  newvalue = newvalue.replace(/(\d{2})$/, ',$1');
  newvalue = newvalue.replace(/(\d+)(\d{3},\d{2})$/g, '$1.$2');
  const qtdLoop = (newvalue.length - 3) / 3;
  let count = 0;
  while (qtdLoop > count) {
    count++;
    newvalue = newvalue.replace(/(\d+)(\d{3}.*)/, '$1.$2');
  }
  newvalue = newvalue.replace(/^(0)(\d)/g, '$2');
  return newvalue;
}

export function convertValueWithMaskInNumber(value: string): number {
  return +value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1');
}
