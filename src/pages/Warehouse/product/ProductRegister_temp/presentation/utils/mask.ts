export function genericMaskNumber(value: string): string {
  let newValue = value
  const integer = newValue?.split('.')[0]

  newValue = newValue?.replace(/\D/g, '')

  newValue = newValue?.replace(/^[0]+/, '')

  if (newValue?.length <= 2 || !integer) {
    if (newValue?.length === 1) newValue = '0,0' + newValue

    if (newValue?.length === 2) newValue = '0,' + newValue
  } else {
    newValue = newValue?.replace(/^(\d{1,})(\d{2})$/, '$1,$2')
  }

  return newValue
}
