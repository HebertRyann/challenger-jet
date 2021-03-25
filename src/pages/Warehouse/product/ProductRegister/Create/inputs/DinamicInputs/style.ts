import styled from 'styled-components';
import { FiTrash } from 'react-icons/fi';

export const Container = styled.div`
  margin: 10px 0;
  > hr {
    margin-bottom: 10px;
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 30px;
`;

export const IconDelete = styled(FiTrash).attrs(() => ({
  color: 'red',
  size: '18px',
}))``;
