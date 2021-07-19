import styled from 'styled-components'

export const FormContent = styled.div<{ modal: boolean }>`
  padding: 1em;

  display: ${props => (props.modal ? 'block' : 'flex')};
  flex-wrap: wrap;
  column-gap: 1em;

  input {
    min-width: 300px;
    width: 100%;
  }

  select {
    min-width: 200px;
    width: 100%;
  }
`
