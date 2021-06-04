import styled, { css } from 'styled-components'
import { MdClose } from 'react-icons/md'

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
    }
  }
  main {
    position: relative;
  }
`

export const InconClose = styled(MdClose).attrs(() => ({
  color: '#333333'
}))`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`
