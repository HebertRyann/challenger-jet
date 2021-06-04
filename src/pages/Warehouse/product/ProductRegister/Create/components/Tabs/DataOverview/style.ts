import styled, { css } from 'styled-components'

export const Container = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
`

export const Select = styled.select.attrs(() => ({
  className: 'form-control'
}))<{ isError: boolean }>`
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
