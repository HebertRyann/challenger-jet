import styled, { css } from 'styled-components';

export const Container = styled.div<{ isActive: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 200;
  display: flex;
  flex-direction: column;
  ${({ isActive }) =>
    !isActive &&
    css`
      display: none;
    `}
  > main {
    padding: 20px;
    background-color: #fff;

    > hr {
      margin: 20px 0 15px 0;
    }

    > footer {
      display: flex;
      justify-content: flex-end;

      > button {
        width: 80px;
        margin-left: 10px;
      }
      > button + button {
        background-color: red;
      }
    }
  }
`;
