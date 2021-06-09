import styled, { css } from 'styled-components'
import { MdClose } from 'react-icons/md'

export const Container = styled.div<{ openModal: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 100;
  padding: 10% 25%;
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    > button + button {
      margin-left: 7px;
    }
  }
  ${({ openModal }) =>
    !openModal &&
    css`
      display: none;
    `}
  > section {
    position: fixed;
    margin: auto;
    max-width: 100%;
    min-width: 55%;
    position: relative;
    background-color: #fff;
    padding: 2% 3%;
    margin: auto;
    border-radius: 3px;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
      rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

    hr {
      margin: 15px auto;
    }
    > header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        font-size: 18px;
        font-weight: bold;
      }
      > div {
        > svg {
          cursor: pointer;
          :hover {
            color: red;
          }
        }
      }
    }
    > main {
      .form-content {
        width: 100%;
      }
      .form-body {
        margin: 20px 0;

        .row {
          margin-top: 15px;
          margin-bottom: 15px;
        }
      }
    }
  }
`

export const CloseIcon = styled(MdClose)``
