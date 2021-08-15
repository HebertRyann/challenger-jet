import styled, { keyframes } from 'styled-components';

const fadeLeftToRight = keyframes`
  from {
    opacity: 0.7;
    transform: translateX(-120%);
  }
  to {
    opacity: 1;
    transform: translateX(0%);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  /* justify-content: center; */

  height: 100vh;

  input.InputOperator{
    height: 100px;
    width: 72%;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.2);
    padding: 10px 20px;
    font-size: 30px;
    margin: 0 auto;
  }

  h1 {
    font-size: 56px;
    margin: 30px auto;
  }
`;

export const ContainerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  padding: 0 30px;
`;

export const ContainerOperator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 500px;
  border-radius: 5px;
  background: #242128;
  margin: 50px;
  overflow: auto;
  padding: 20px 0;

  div.ContentHead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    width: 100%;
    height: 56px;

    strong {
      text-align: left;
      font-size: 28px;
      margin-left: 10px;
    }
    div.IconsHead {
      svg {
        
        & + svg {
          margin-left: 20px;
        }
      }
    }
    input.InputEditOperator {
      height: 26px;
      padding: 0 10px;
    }
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  margin: 50px 0;
  
  button {
    height: 88px;
    width: 320px;
    background: #0066f7;
    color: #fff;
    border-radius: 8px;
    font-size: 20px;
    font-weight: 500;
  }

  .file {
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
  }
  .file-input label {
    background: #FF0066;
    display: block;
    position: relative;
    width: 320px;
    height: 88px;
    border-radius: 8px;
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    margin: 0 50px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #6BFA8A;
    height: 88px;
    width: 320px;
    color: #282421;
    text-decoration: none;
    text-align: center;
    border-radius: 8px;
    font-size: 20px;
    font-weight: 500;
    margin-right: 50px;
  }
`;

export const WrapperClients = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  /* flex-wrap: wrap; */
`;

export const ContainerClient = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  height: 110px;
  border: 1px solid rgba(0,0,0,0.5);
  border-radius: 8px;
  background: #fff;
  color: #000;
  animation: ${fadeLeftToRight} 1s ease-in-out;
  & + div {
    margin-top: 10px;
  }
`;

export const ContainerHeaderClient = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  div {
    padding: 0 20px;
    display: flex;
    span {
      text-align: left;
      margin-right: 10px;
    }
  }
`;

export const ContainerFooterClient  = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;
  div {
    display: flex;
    justify-content: center;
    padding: 0 20px;
    span {
      margin-right: 10px;
    }
  }
`;

export const LoadingModal = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.15);
`;
