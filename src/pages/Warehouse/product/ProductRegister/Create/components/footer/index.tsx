import React from 'react';

import { Container } from './styles';

export const FooterCreateProduct = (): JSX.Element => {
  return (
    <Container>
      <button className="btn disabled dark btn-sm sbold uppercase">
        <span
          className="fa fa-arrow-left"
          aria-hidden="true"
          style={{ marginRight: '5px' }}
        />
        Voltar
      </button>
      <button className="btn dark btn-sm sbold uppercase">
        Continuar
        <span
          className="fa fa-arrow-right"
          aria-hidden="true"
          style={{ marginLeft: '5px' }}
        />
      </button>
    </Container>
  );
};
