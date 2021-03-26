import React, { useCallback, useState } from 'react';

import { Container, JokerIcon } from './style';

type TypeTooltipComponent = {
  message: string;
  label: string;
};

export const TooltipComponent = ({ message, label }: TypeTooltipComponent) => {
  const [mouseUp, setMouseUp] = useState(false);

  const handlerMouseUp = useCallback(() => {
    setMouseUp(true);
  }, [mouseUp]);

  const handlerMouseDown = useCallback(() => {
    setMouseUp(false);
  }, [mouseUp]);

  return (
    <Container hidden={mouseUp}>
      <label htmlFor="form">{label}</label>
      <span>{message}</span>
      <JokerIcon
        onMouseEnter={handlerMouseUp}
        onMouseLeave={handlerMouseDown}
      />
    </Container>
  );
};
