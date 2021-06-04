import React from 'react'
import loadingSvg from '../../assets/image/svg/loading.svg'
import { Container } from './styles'

type PropsLoading = {
  isActive: boolean
}

export const Loading = ({ isActive }: PropsLoading): JSX.Element => {
  return (
    <Container isActive={isActive}>
      <div>
        <img alt="image-loading" src={loadingSvg} />
        <p>Carregando</p>
      </div>
    </Container>
  )
}
