import styled from 'styled-components'

export const Container = styled.div`
  .disable {
    display: none;
  }

  & + & {
    margin-top: 20px !important;
  }
`
