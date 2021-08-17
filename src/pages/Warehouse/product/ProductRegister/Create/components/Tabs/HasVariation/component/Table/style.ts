import { FaTrashAlt } from 'react-icons/fa'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  padding: 5px 20px 10px 20px;
  margin: 0;
  .actions {
    width: 60px;
  }
  textarea {
    height: 90px;
  }
  input {
    -moz-placeholder {
      text-align: right;
    }
    ::-webkit-input-placeholder {
      text-align: right;
    }
    text-align: end;
  }
  .row {
    margin-bottom: 20px !important;
  }
`

export const IconRemove = styled(FaTrashAlt).attrs(() => ({
  size: '16px'
}))`
  margin: 10px auto;
  cursor: pointer;
`

export const Th = styled.th.attrs(
  ({ isTypeSaleOrResale }: { isTypeSaleOrResale?: boolean }) => {
    return {
      rowSpan: isTypeSaleOrResale ? 2 : 1
    }
  }
)<{
  active?: boolean
  isTypeSaleOrResale?: boolean
}>`
  display: none;
  ${({ active }) =>
    active &&
    css`
      display: table-cell;
    `}
  ${({ isTypeSaleOrResale }) =>
    isTypeSaleOrResale &&
    css`
      position: relative;
      line-height: 50px;
    `}
`

export const Td = styled.td<{
  active?: boolean
  isTypeSaleOrResale?: boolean
}>`
  display: none;
  ${({ active }) =>
    active &&
    css`
      display: table-cell;
    `}
`

export const TextArea = styled.textarea<{ isError: boolean }>`
  height: 90px;
  ${({ isError }) =>
    isError &&
    css`
      border: #d43f3a solid 1px !important;
      background-color: #ebcccc !important;
      color: #d43f3a;
      > option {
        background-color: #fff;
        color: #666;
      }
    `}
`