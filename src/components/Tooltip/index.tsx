import React from 'react'

import { Contanier } from './styled'

interface TooltipProps {
  title: string
  className?: string
}

const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  return (
    <Contanier className={className}>
      {children}
      <span>{title}</span>
    </Contanier>
  )
}

export default Tooltip
