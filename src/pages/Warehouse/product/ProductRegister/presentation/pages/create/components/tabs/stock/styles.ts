import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 20px !important;

  textarea {
    width: 100%;
    border: 1px solid #c2cad8;
    height: 90px;
    padding: 5px 10px;
  }
`

export const Th = styled.th.attrs(({ isSale }: { isSale: boolean }) => {
  return isSale ? { rowSpan: 2 } : { rowSpan: 1 }
})<{
  isSale?: boolean
}>``
