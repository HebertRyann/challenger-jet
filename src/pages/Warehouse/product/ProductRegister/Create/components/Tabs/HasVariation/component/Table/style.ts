import { FaTrashAlt } from 'react-icons/fa';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 5px 20px 10px 20px;
  margin: 0;
  .actions {
    width: 60px;
  }
`;

export const IconRemove = styled(FaTrashAlt).attrs(() => ({
  size: '16px',
}))`
  margin: 10px auto;
  cursor: pointer;
`;

export const Th = styled.th.attrs(
  ({ isTypeSaleOrResale }: { isTypeSaleOrResale?: boolean }) => {
    return {
      rowSpan: isTypeSaleOrResale ? 2 : 1,
    };
  },
)<{
  active?: boolean;
  isTypeSaleOrResale?: boolean;
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
`;

export const Td = styled.td<{
  active?: boolean;
  isTypeSaleOrResale?: boolean;
}>`
  display: none;
  ${({ active }) =>
    active &&
    css`
      display: table-cell;
    `}
`;
