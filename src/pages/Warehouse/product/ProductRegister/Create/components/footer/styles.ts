import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    width: 120px;
  }

  & button + button {
    margin-left: 10px;
  }
`;

export const ContainerFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
