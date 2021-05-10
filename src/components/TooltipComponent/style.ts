import styled, { css } from 'styled-components';
import { FaQuestionCircle } from 'react-icons/fa';

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  z-index: 100;
  > div {
    margin-left: 15px;
    cursor: help;
    a {
      cursor: help;
    }
  }
`;

export const JokerIcon = styled(FaQuestionCircle)``;
