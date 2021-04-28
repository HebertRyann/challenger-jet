import styled, { css } from 'styled-components';

export const ContainerSearch = styled.div<{ active: boolean }>`
  display: none;
  position: absolute;
  z-index: 15;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 2px;
  ${({ active }) =>
    active &&
    css`
      display: block;
    `}
  top: 100%;
  background-color: #fff;
  border: 1px solid #c2cad8;
  width: 162%;
  max-height: 200px;
  > ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 67%;
    > section {
      background-color: #fefefe;
      > h5 {
        margin-left: 10px;
        font-weight: 16px;
        font-weight: bold;
        color: #555;
        text-transform: uppercase;
      }
      > table {
        width: 150%;
        display: table;
        .header {
          background-color: #fff;
          h5 {
            margin-left: 10px;
            font-weight: 10px;
            font-weight: bold;
          }
        }
        td {
          background-color: red;
        }
        th {
          text-align: center;
        }
        tbody {
          > tr {
            background-color: #fdfdfd;
            border: none;
            > th {
              > h5 {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
`;
