import React from 'react';

import { Container } from './styles';

type TypeSaveFooter = {
  onSave: (params: any) => void;
};

export const SaveFooter = ({ onSave }: TypeSaveFooter): JSX.Element => {
  return (
    <Container>
      <button onClick={onSave} className="btn dark btn-sm sbold uppercase">
        salvar
      </button>
    </Container>
  );
};
