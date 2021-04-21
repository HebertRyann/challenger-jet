import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-top: 30px;
  label {
    font-weight: bold;
  }
  .name-fisco {
    margin: 25px 0;
  }
  hr {
    margin: 15px 0;
  }
  .form-content {
    > input {
      margin-bottom: 15px;
    }
  }
`;

export const ContainerFiscal = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 50px;
  margin-top: 20px;
`;

export const ContentItemFiscal = styled.div`
  position: relative;
  margin-top: 40px;
  > footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const TabNameFiscal = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  padding: 10px 30px 10px 30px;
  border: 1px solid transparent;
  border-radius: 4px 4px 0 0 !important;
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #ffffff;
      border: 1px solid #dddddd;
      border-bottom-color: #ffffff;
    `};
  margin-bottom: 40px;
`;

export const TabHeaderContainerFiscal = styled.div`
  transform: translateY(10px);
  position: absolute;
  display: flex;
`;

export const TabPanelContainerFiscal = styled.div`
  border: 1px solid #e3e3e3;
  padding: 20px;
  margin-top: 50px;

  hr {
    margin-bottom: 20px;
  }
`;

export const RenderComponent = styled.div<{ isActive: boolean }>`
  display: none;
  ${({ isActive }) =>
    isActive &&
    css`
      display: block;
    `};
`;
