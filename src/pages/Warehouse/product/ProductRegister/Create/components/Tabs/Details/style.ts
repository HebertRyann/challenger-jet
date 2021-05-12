import styled, { css } from 'styled-components';

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
    text-align: end;
  }
  .col-md-3 {
    margin-bottom: 10px !important;
  }
`;

export const TextArea = styled.textarea<{ isError: boolean }>`
  height: 90px;
  ${({ isError }) =>
    isError &&
    css`
      border: #d43f3a solid 1px !important;
      background-color: #ebcccc !important;
      color: #d43f3a;
      > option {
        background-color: #fff;
        color: #666;
      }
    `}
`;
