import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 120px;
  }

  & button + button {
    margin-left: 10px;
  }
`;
