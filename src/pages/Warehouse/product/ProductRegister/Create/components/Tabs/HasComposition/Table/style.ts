import { FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 5px 20px 10px 20px;
  margin: 0;
  .actions {
    width: 60px;
  }
  > hr {
  }
`;

export const IconRemove = styled(FaTrashAlt).attrs(() => ({
  size: '16px',
}))`
  margin: 10px auto;
  cursor: pointer;
`;
