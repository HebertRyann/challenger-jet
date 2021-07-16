import styled from 'styled-components'

export const FormContent = styled.div`
  padding: 1em;

  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1em;

  input[name='name'] {
    width: 400px;
  }
`
