import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 30px;
  label {
    font-weight: bold;
  }
  .items {
    height: 10px;
    > td {
      text-align: start !important;
      text-transform: uppercase;
    }
  }
  .text-area {
    margin-top: 20px;
  }

  hr {
    margin: 40px 0;
  }

  .title {
    text-align: end;
    font-weight: bold;
  }
  .value {
    text-align: start !important;
    font-weight: bold;
  }
`;
