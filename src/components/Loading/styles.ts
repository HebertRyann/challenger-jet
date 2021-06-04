import styled, { css } from 'styled-components'

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

  > div {
    display: flex;
    background-color: #ffffff;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 20%;
    width: 13%;
    border-radius: 5px !important;
    padding: 0;
    > img {
      height: 50%;
    }
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
      rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    > p {
      margin-top: 10px;
      color: #333333;
    }
  }

  ${({ isActive }) =>
    !isActive &&
    css`
      display: none;
    `}
`
