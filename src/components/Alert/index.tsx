import React from 'react';

import { Container } from './style';

type AlertProps = {
  message: string;
  isActive: boolean;
  onClickConfirmButton: (id: string) => void;
  onClickCancellButton: () => void;
};

export const Alert = ({
  message,
  onClickCancellButton,
  onClickConfirmButton,
  isActive,
}: AlertProps): JSX.Element => {
  return (
    <Container isActive={isActive}>
      <main>
        <h4>{message}</h4>
        <hr />
        <footer>
          <button
            className="btn dark btn-sm sbold uppercase"
            onClick={() => {
              onClickConfirmButton('');
            }}
          >
            Ok
          </button>
          <button
            className="btn btn-default btn-sm sbold uppercase"
            onClick={onClickCancellButton}
          >
            Cancelar
          </button>
        </footer>
      </main>
    </Container>
  );
};
