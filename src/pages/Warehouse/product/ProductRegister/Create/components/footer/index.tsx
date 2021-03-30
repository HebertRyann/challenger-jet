import React from 'react';

import { Container } from './styles';

type TypeFooterCreateProduct = {
  onClickButtonBack?: (params: any) => any;
  onClickButtonNext?: (params: any) => any;
};

export const FooterCreateProduct = ({
  onClickButtonBack,
  onClickButtonNext,
}: TypeFooterCreateProduct): JSX.Element => {
  return (
    <Container>
      <button
        onClick={onClickButtonBack}
        className="btn disabled dark btn-sm sbold uppercase"
      >
        <span
          className="fa fa-arrow-left"
          aria-hidden="true"
          style={{ marginRight: '5px' }}
        />
        Voltar
      </button>
      <button
        onClick={onClickButtonNext}
        className="btn dark btn-sm sbold uppercase"
      >
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
