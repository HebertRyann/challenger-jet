import styled from 'styled-components';
import { FiTrash } from 'react-icons/fi';

export const Container = styled.div`
  margin: 10px 0;
  border: 1px solid #c2cad8;
  padding: 20px 10px;
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
