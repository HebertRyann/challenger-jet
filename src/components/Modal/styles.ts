import styled, { css } from 'styled-components';
import { MdClose } from 'react-icons/md';

export const Container = styled.div<{ openModal: boolean }>`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 100;
  top: 0;
  position: absolute;
  padding: 10% 35%;
  ${({ openModal }) =>
    !openModal &&
    css`
      display: none;
    `}
  > section {
    position: relative;
    background-color: #fff;
    padding: 2% 3%;
    margin: auto;
    border-radius: 3px;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
      rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    > header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        font-size: 18px;
        font-weight: bold;
      }
      > div + div {
        > svg {
          cursor: pointer;
          :hover {
            color: red;
          }
        }
      }
    }
    > main {
      height: 100%;
      width: 100%;
      .form-content {
        width: 100%;
        margin: 20px 0;
      }
    }

    > footer {
      width: 100%;
      justify-content: flex-end;
      align-self: flex-end;
      display: flex;
      > button {
        width: 90px;
        margin-left: 10px;
        padding: 5px 15px;
        border: none;
      }
    }
  }
`;

export const CloseIcon = styled(MdClose)``;
