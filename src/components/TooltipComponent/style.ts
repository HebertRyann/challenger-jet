import styled, { css } from 'styled-components';
import { FaQuestionCircle } from 'react-icons/fa';

export const Container = styled.div<{ hidden: boolean }>`
  position: relative;

  > span {
    position: absolute;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.9);
    color: #fff;
    padding: 5px 10px;
    transform: translate(-32%, -120%);
    display: block;
  }

  > span:after {
    content: '';
    position: absolute;
    transform: rotate(180deg);
    left: 50%;
    bottom: -20%;
    margin-left: -8px;
    width: 0;
    height: 0;
    border-bottom: 8px solid rgba(0, 0, 0, 0.9);
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
  }

  ${({ hidden }) =>
    hidden &&
    css`
      > span {
        display: block;
      }
    `}
`;

export const JokerIcon = styled(FaQuestionCircle)`
  margin-left: 15px;
`;
