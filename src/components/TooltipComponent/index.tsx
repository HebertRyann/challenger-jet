import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import { Container, JokerIcon } from './style';

type TypeTooltipComponent = {
  message: string;
  label: string;
};

export const TooltipComponent = ({ message, label }: TypeTooltipComponent) => {
  const [mouseUp, setMouseUp] = useState(false);

  return (
    <Container >
      <label htmlFor="form">{label}</label>
      <div>
        <a data-tip={message}>
          <JokerIcon />
        </a>
        <ReactTooltip place="top" type="dark" effect="float" />
      </div>
    </Container>
  );
};
