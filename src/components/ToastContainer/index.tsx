import React from 'react'
import { useTransition } from 'react-spring'

import Toast from './Toast'
import { ToastMessage } from '../../hooks/toast'
import { Contanier } from './styles'

interface TostContanierProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<TostContanierProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { top: '120%' },
      enter: { top: '0%' },
      leave: { top: '120%' }
    }
  )
  return (
    <Contanier>
      {messagesWithTransitions.map(({ item, props }) => (
        <Toast key={Math.random()} style={props} message={item} />
      ))}
    </Contanier>
  )
}

export default ToastContainer
