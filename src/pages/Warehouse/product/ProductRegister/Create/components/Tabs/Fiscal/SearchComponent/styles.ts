import styled, { css } from 'styled-components';

export const ContainerSearch = styled.div<{ active: boolean }>`
  display: none;
  position: absolute;
  z-index: 150;
  overflow-y: scroll;
  overflow-x: hidden;
  ${({ active }) =>
    active &&
    css`
      display: block;
    `}
  top: 100%;
  background-color: #fff;
  border: 1px solid #c2cad8;
  width: 100%;
  max-height: 200px;
  > ul {
    li {
      padding: 5px;
      font-weight: 16px;
      color: #555;
      width: 100%;
      text-transform: uppercase;
      border-bottom: 0.5px solid #c2cad8;
      border-right: 0.5px solid #c2cad8;
    }
    li:nth-child(even) {
      background: #f5f5f5;
    }
    li:hover {
      cursor: pointer;
      background-color: #f5f5f5;
    }
  }
`;
