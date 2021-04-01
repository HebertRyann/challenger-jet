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
  }, []);

  const handlerMouseDown = useCallback(() => {
    setMouseUp(false);
  }, []);

  return (
    <Container hidden={mouseUp}>
      <label htmlFor="form">{label}</label>
      <div>
        <span>{message}</span>
        <JokerIcon
          onMouseEnter={handlerMouseUp}
          onMouseLeave={handlerMouseDown}
        />
      </div>
    </Container>
  );
};
