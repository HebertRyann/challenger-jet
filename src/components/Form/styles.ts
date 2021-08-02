import styled from 'styled-components'

import Tooltip from '../Tooltip'

export const Contanier = styled.div`
  border-radius: 10px;
  margin-bottom: 1em;

  > label {
    font-weight: normal;
  }

  & > div {
    position: relative;
  }

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
`

export const Error = styled(Tooltip)`
  height: 20px;
  width: fit-content;
  position: absolute;
  right: 5px;
  margin: 0;
  top: 50%;
  transform: translateY(-50%);
  svg {
    margin: 0;
  }

  span {
    width: max-content;
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`

export const SelectContanier = styled.div<{ erro?: boolean }>`
  border-radius: 10px;
  margin-bottom: 1em;

  > label {
    font-weight: normal;
  }

  select {
    width: 100%;
    padding: 5px;

    border: ${props => props.erro && '1px solid red'};
    color: ${props => (props.erro ? 'red' : '#000')};
  }
`
