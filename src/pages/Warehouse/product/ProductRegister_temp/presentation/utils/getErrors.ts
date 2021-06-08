// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getError = (error: any): string => {
  if (error) return 'error'
  return ''
}
