import styled, { css } from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { FiChevronDown } from 'react-icons/fi';

export const ContainerDropdown = styled.div<{ isError: boolean | undefined }>`
  > label {
    margin-top: 5px;
    color: #d43f3a !important;
  }
  > header {
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    ${({ isError }) =>
      isError &&
      css`
        .form-control {
          border-color: #d43f3a !important;
          background-color: #ebcccc !important;
          color: #d43f3a;
          svg {
            * {
              color: #d43f3a;
            }
          }
        }
      `}
  }
  background-color: #fff;
  z-index: 1;
`;

export const Content = styled.div<{ isActive: boolean }>`
  display: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border: 1px solid #c2cad8;
  height: 100%;
  position: absolute;
  background-color: #fff;
  width: 90%;
  z-index: 1;

  .no-content {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    > h5 {
      margin-top: -10px;
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      display: block;
    `}
  * {
    list-style: none;
  }

  > header {
    display: flex;
    align-items: center;
  }

  > header > input {
    position: relative;
    margin: 10px auto;
    padding-right: 25px;
    width: 90%;
    color: #555;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23) !important;
  }

  > div {
    background-color: #fff;
    border: 1px solid #c2cad8;
    text-transform: uppercase;
    .no-content {
      text-align: center;
      margin-top: 15px;
    }
    > div {
      padding: 10px;
      font-weight: bold;
      background-color: rgba(233, 237, 239, 0.9);
      width: 100%;
    }

    > ul > li:nth-child(2n) {
      background-color: rgba(233, 237, 239, 0.2);
    }

    min-height: 100%;
    max-height: 300px;
    overflow-y: scroll;
    > ul {
      margin-bottom: 0;
      border: 1px solid rgba(0, 0, 0, 0.16);

      > li {
        border: 1px solid rgba(233, 237, 239, 0.5);
        padding: 10px 15px;
        :hover {
          background-color: rgba(233, 237, 239, 0.8);
          cursor: pointer;
        }
      }
    }
  }
`;

export const IconArrowDown = styled(FiChevronDown).attrs(() => ({
  size: '16px',
  color: '#555',
}))`
  position: absolute;
  top: 0;
  right: 3px;
  height: 100%;
`;

export const IconSearch = styled(MdSearch).attrs(() => ({
  size: '18px',
  color: '#555',
}))`
  position: absolute;
  top: 35%;
  right: 20px;
`;
