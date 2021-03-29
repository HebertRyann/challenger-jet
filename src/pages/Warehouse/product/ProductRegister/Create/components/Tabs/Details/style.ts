import styled from 'styled-components';

export const Container = styled.div`
  textarea {
    height: 90px;
  }
  input {
    margin-bottom: 15px;
    -moz-placeholder {
      text-align: right;
    }
    ::-webkit-input-placeholder {
      text-align: right;
    }
  }
`;
