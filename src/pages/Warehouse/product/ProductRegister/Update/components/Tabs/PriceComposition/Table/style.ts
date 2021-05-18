import styled from 'styled-components';

export const ContainerInput = styled.div`
  background-color: green !important;
  input {
    -moz-placeholder {
      text-align: right;
    }
    ::-webkit-input-placeholder {
      text-align: right;
    }
    text-align: end;
  }
`;
