import styled, { css } from 'styled-components';

export const Container = styled.div<{ isActive: boolean }>`
  position: relative;
  margin: 0 0 20px 0;
  > ul {
    display: none;
    ${({ isActive }) =>
      isActive &&
      css`
        display: block;
      `}
    width: 100%;
    position: absolute;
    top: 32px;
    left: 0;
    list-style: none;
    background-color: #fff;
    border: 1px solid #c2cad8;
    z-index: 1;

    > ul > li:nth-child(2n) {
      background-color: rgba(233, 237, 239, 0.2);
    }

    > li {
      border: 1px solid rgba(233, 237, 239, 0.5);
      padding: 10px 15px;
      :hover {
        background-color: rgba(233, 237, 239, 0.8);
        cursor: pointer;
      }
    }
  }
`;
