import styled, { css } from 'styled-components'
import loadingSvg from '../../assets/image/svg/loading.svg'

export const Container = styled.div<{ isError?: boolean }>`
  ${({ isError }) =>
    isError &&
    css`
      > select {
        border: #d43f3a solid 1px !important;
        background-color: #ebcccc !important;
        color: #d43f3a;
        > option {
          background-color: #fff;
          color: #666;
        }
      }
    `}
  > label {
    margin-top: 5px;
    color: #d43f3a !important;
  }
  img {
    position: absolute;
    top: 51%;
    right: 3%;
    width: 20px;
    background-color: #fff;
  }
`

export const Loading = styled.div`
  background-image: url(${loadingSvg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 50%;
`
