import styled, { css } from 'styled-components';
import { MdArrowDropDown } from 'react-icons/md';

export const Container = styled.div<{ isActive: boolean; disable: boolean }>`
  position: relative;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  cursor: pointer;
  ${({ disable }) =>
    disable &&
    css`
      background-color: #fff;
      color: #ddd;
      cursor: default;
    `}
  > ul {
    display: none;
    text-transform: uppercase;
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

export const IconArrowDown = styled(MdArrowDropDown).attrs(() => ({
  size: '18px',
  color: '#555',
}))`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(233, 237, 239, 0.9);
  height: 100%;
  border: 1px solid #c2cad8;
`;
