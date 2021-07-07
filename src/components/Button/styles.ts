import styled from 'styled-components'
import { shade } from 'polished'
import loadingSvg from '../../assets/image/svg/loading-button.svg'

export const Contanier = styled.button`
  color: #312e38;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`

export const ContainerButton = styled.div`
  button {
    height: 100%;
    background-color: #666;
    height: 36px;
    width: 120px;
    border: none;
    margin-bottom: 25px;
    margin-top: -20px;
    text-transform: uppercase;
    color: #fff;
  }
  .loading {
    background-image: url(${loadingSvg});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 100%;
    height: 50%;
  }
`
