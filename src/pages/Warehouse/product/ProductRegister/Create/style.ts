import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  strong {
    color: red;
  }
  > header {
    padding: 20px;
    background-color: #f7ca18;
    border: 1px solid #c8d046;
  }

  > main {
    margin: 40px 0;
    position: relative;
    padding: 50px 20px;
    background-color: #e5e5e5;
    span {
      top: 0;
      transform: translate(0, -50%);
      position: absolute;
    }

    > section {
      position: relative;
      padding: 20px 20px;
      background-color: #fff;
      > main {
        display: flex;
        justify-content: space-around;
        display: flex;
        align-items: center;

        > div {
          > input {
            margin-right: 10px;
            margin-top: 5px;
          }
          > label {
            margin-top: -5px;
          }
        }
      }
    }
  }
`;
