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

  .total {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    p {
      margin-right: 5px;
      font-weight: bold;
    }
  }
`;
