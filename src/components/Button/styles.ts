import styled from 'styled-components';
import { shade } from 'polished';

export const Contanier = styled.button`
  color: #312e38;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
