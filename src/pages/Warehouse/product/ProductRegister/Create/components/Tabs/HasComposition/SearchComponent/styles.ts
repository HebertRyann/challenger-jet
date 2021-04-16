import styled, { css } from 'styled-components';

export const ContainerSearch = styled.div<{ active: boolean }>`
  display: none;
  position: absolute;
  z-index: 1500000;
  overflow-y: scroll;
  ${({ active }) =>
    css`
      display: block;
    `}
  top: 100%;
  background-color: #fff;
  border: 1px solid #c2cad8;
  width: 100%;
  max-height: 200px;
  > ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    h5 {
      margin-left: 15px;
    }
  }
`;
