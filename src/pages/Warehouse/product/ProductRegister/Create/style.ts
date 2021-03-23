import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  > select {
    -webkit-appearance: none;
    -moz-appearance: none;
    margin: 0px 0 20px 0;
  }
`;

export const VisibleContent = styled.div<{ isVisible: boolean }>`
  display: none;
  ${({ isVisible }) =>
    isVisible &&
    css`
      display: block;
    `}
`;
