import styled, { css } from 'styled-components'

export const Container = styled.div<{ link?: boolean }>`
  ${({ link }) =>
    link &&
    css`
      .dashboard-stat2 {
        cursor: pointer;
      }
    `}
  padding: 15px;
  .black-haze {
    background: #000000 !important;
    color: #ffffff !important;
  }
  section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  h3 {
    color: #707273;
    margin: 0px;
    font-size: 30px;
    font-weight: 400;
  }

  .left {
    p {
      width: 120%;
    }
    p {
      font-size: 14px;
      color: #aab5bc;
      font-weight: 600;
      text-transform: uppercase;
    }
  }

  .right {
    .icon {
      color: #cbd4e0;
      font-size: 26px;
    }
  }

  footer {
    .description {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`
