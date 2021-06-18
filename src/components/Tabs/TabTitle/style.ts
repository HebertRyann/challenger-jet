import styled, { css } from 'styled-components'

export const Li = styled.li<{ active: boolean }>`
  position: absolute;
  transform: translateY(-50%);
  span {
    cursor: pointer;

    ${({ active }) =>
      active &&
      css`
        border-top: 1px solid #e3e3e3;
        border-left: 1px solid #e3e3e3;
        border-right: 1px solid #e3e3e3;
        background-color: #fff;
        z-index: 1;
      `}
    padding: 10px 20px;
  }
`
