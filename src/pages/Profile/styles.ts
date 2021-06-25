import styled from 'styled-components'

export const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1em;
  align-items: stretch;

  > div:first-child {
    background: #f1f1f1;
  }
`
