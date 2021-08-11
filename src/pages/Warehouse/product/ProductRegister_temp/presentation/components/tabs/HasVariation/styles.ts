import styled from 'styled-components'

export const Container = styled.div`
  .check-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    > div {
      display: flex;
      align-items: center;
      margin: 0 10px;

      > input[type='checkbox'] {
        margin: 0 5px;
        height: 40px;
      }
    }
  }

  > footer {
    margin: 20px;
  }
`
