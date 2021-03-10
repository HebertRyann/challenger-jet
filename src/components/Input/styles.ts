import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContanierProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Contanier = styled.div<ContanierProps>`
  border-radius: 10px;
  width: 100%;

  & > div {
    position: relative;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 1px solid #c2cad8;
    padding-right: 30px;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  position: absolute;
  right: 5px;
  margin: 0;
  top: 50%;
  transform: translateY(-50%);
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
