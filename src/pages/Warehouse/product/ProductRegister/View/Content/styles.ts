import styled, { css } from 'styled-components'

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 60px;
  margin-top: 20px;
`

export const ContentItem = styled.div`
  margin-top: 40px;
  height: 100%;
`

export const TabName = styled.div<{ isActive: boolean }>`
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
`

export const TabHeaderContainer = styled.div`
  transform: translateY(-40px);
  position: absolute;
  display: flex;
`

export const TabPanelContainer = styled.div`
  height: 100%;
  border: 1px solid #e3e3e3;
  padding: 20px;

  hr {
    margin: 10px 0;
  }
`

export const RenderComponent = styled.div<{ isActive: boolean }>`
  display: none;

  ${({ isActive }) =>
    isActive &&
    css`
      height: 100%;
      display: block;
    `};
`
