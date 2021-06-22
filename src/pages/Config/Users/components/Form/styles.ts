import styled from 'styled-components'

export const CustomSelect = styled.div`
  select {
    margin-bottom: 1rem;
  }
`
export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div:first-child {
    display: none;
  }

  > div {
    max-width: 400px;
    margin-left: 1rem;
  }
`
