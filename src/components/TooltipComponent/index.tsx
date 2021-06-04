import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip'

import { Container, JokerIcon } from './style'

type TypeTooltipComponent = {
  message: string
  label: string
  bold?: boolean
}

export const TooltipComponent = ({
  message,
  label,
  bold
}: TypeTooltipComponent) => {
  return (
    <Container bold={bold}>
      <label htmlFor="form">{label}</label>
      <div>
        <a data-tip={message}>
          <JokerIcon />
        </a>
        <ReactTooltip place="top" type="dark" effect="float" />
      </div>
    </Container>
  )
}
