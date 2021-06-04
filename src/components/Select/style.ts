import styled, { css } from 'styled-components'
import { MdArrowDropDown, MdSearch } from 'react-icons/md'

export const Container = styled.div<{ isActive: boolean; disable: boolean }>`
  position: relative;
  margin: 0;
  text-transform: uppercase;
  cursor: pointer;
  ${({ disable }) =>
    disable &&
    css`
      background-color: #fff;
      color: #ddd;
      cursor: default;
    `}

  > main {
    > section {
      > ul {
        list-style: none;
        > li {
          border: 1px solid rgba(233, 237, 239, 0.5);
          padding: 10px 15px;
          :hover {
            background-color: rgba(233, 237, 239, 0.8);
            cursor: pointer;
          }
        }
        > li:nth-child(2n) {
          background-color: rgba(233, 237, 239, 0.2);
        }
      }
    }

    > ul {
      list-style: none;
      > li {
        border: 1px solid rgba(233, 237, 239, 0.5);
        padding: 10px 15px;
        :hover {
          background-color: rgba(233, 237, 239, 0.8);
          cursor: pointer;
        }
      }
      > li:nth-child(2n) {
        background-color: rgba(233, 237, 239, 0.2);
      }
    }

    > section {
      > header {
        position: relative;
        padding: 10px 10px 0 10px;

        > input {
          margin-bottom: 10px;
        }
      }
    }

    display: none;
    text-transform: uppercase;
    ${({ isActive }) =>
      isActive &&
      css`
        display: block;
      `}
    width: 100%;
    position: absolute;
    top: 32px;
    left: 0;
    list-style: none;
    background-color: #fff;
    border: 1px solid #c2cad8;
    z-index: 1;
  }

  > section {
    background-color: red;
  }
`

export const IconArrowDown = styled(MdArrowDropDown).attrs(() => ({
  size: '18px',
  color: '#555'
}))`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(233, 237, 239, 0.9);
  height: 100%;
  border: 1px solid #c2cad8;
`

export const IconSearch = styled(MdSearch).attrs(() => ({
  size: '18px',
  color: '#555'
}))`
  position: absolute;
  top: 40%;
  right: 20px;
`
