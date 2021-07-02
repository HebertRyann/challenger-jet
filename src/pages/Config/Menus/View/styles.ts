import styled from 'styled-components'

export const MenuTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  th:last-child {
    text-align: center;
  }

  tbody {
    tr:nth-child(2n) {
      background: #fbfcfd;
    }
  }

  td,
  th,
  thead {
    padding: 8px 10px;
    border: 1px solid #e7ecf1;
  }
`
export const MenuTableRow = styled.tr``

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  color: #666;

  > div {
    margin: 0px 0.4em;

    cursor: pointer;
  }
`
