import styled, { css } from 'styled-components';

export const Container = styled.div<{ isError?: boolean }>`
  ${({ isError }) =>
    isError &&
    css`
      > input {
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
`;
