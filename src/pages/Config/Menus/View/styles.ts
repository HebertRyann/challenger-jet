import styled from 'styled-components'

export const MenuTable = styled.table`
  width: 100%;

  thead {
    height: 50px;
  }

  td {
    padding: 0.5em;
  }
`
export const MenuTableRow = styled.tr`
  background: #dedede;
`
export const LinkContainer = styled.div`
  display: flex;

  > div {
    padding: 0.5em;
    margin: 0px 0.4em;

    cursor: pointer;
  }
`
