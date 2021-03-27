import styled, { css } from 'styled-components';
import { FaQuestionCircle } from 'react-icons/fa';

export const Container = styled.div<{ hidden: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  > div {
    > span {
      cursor: help;
      display: none;
      position: absolute;
      text-align: center;
      border: blueviolet;
      background-color: rgba(0, 0, 0, 0.8);
      color: #fff;
      padding: 5px 10px;
      transform: translate(-37%, -130%);
      ${({ hidden }) =>
        hidden &&
        css`
          display: block;
        `}
    }
    > span:after {
      content: '';
      position: absolute;
      transform: rotate(180deg);
      left: 50%;
      bottom: -15%;
      margin-left: -8px;
      width: 0;
      height: 0;
      border-bottom: 8px solid rgba(0, 0, 0, 0.8);
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
    }
  }

  > span {
    position: absolute;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 5px 10px;
    transform: translate(-32%, -150%);
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
    border-bottom: 8px solid rgba(0, 0, 0, 0.8);
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
  }
`;

export const JokerIcon = styled(FaQuestionCircle)`
  margin-left: 15px;
`;
