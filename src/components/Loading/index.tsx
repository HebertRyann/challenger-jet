import React from 'react'
import { Container } from './styles'

type PropsLoading = {
  isActive: boolean
}

export const Loading = ({ isActive }: PropsLoading): JSX.Element => {
  return (
    <Container isActive={isActive}>
      <div>
        <div className="loading" />
        <p>Carregando</p>
      </div>
    </Container>
  )
}
