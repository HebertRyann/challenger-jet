import { FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: hidden;
  padding: 0px 0px 10px 0px;
  min-height: 200px;
  z-index: 15555;
  height: 100%;
  .actions {
    width: 60px;
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
  margin-top: 50px;
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
