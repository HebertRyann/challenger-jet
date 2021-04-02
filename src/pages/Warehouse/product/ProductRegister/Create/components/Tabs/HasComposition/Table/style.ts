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
  margin: 0 auto;
  cursor: pointer;
`;

export const FooterStyled = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > button {
    height: 30px;
  }
  > div {
    > h4 {
      font-size: 14px;
      font-weight: bolder;
    }
    > h6 {
      margin-top: -5px;
      font-size: 14px;
      font-weight: bolder;
      text-align: end;
    }
  }
`;
