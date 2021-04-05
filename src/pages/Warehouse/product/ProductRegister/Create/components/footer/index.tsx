import React from 'react';

import { Container, ContainerFooter } from './styles';

type TypeFooterCreateProduct = {
  onClickButtonBack?: (params: any) => any;
  onClickButtonNext?: (params: any) => any;
  onSave?: (params: any) => void;
};

export const Footer = ({
  onClickButtonBack,
  onClickButtonNext,
  onSave,
}: TypeFooterCreateProduct): JSX.Element => {
  return (
    <>
      <Container>
        <button
          onClick={onClickButtonBack}
          className={
            onClickButtonBack !== undefined
              ? 'btn dark btn-sm sbold uppercase'
              : 'btn disabled dark btn-sm sbold uppercase'
          }
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
          className="btn dark btn-sm bold uppercase"
        >
          Continuar
          <span
            className="fa fa-arrow-right"
            aria-hidden="true"
            style={{ marginLeft: '5px' }}
          />
        </button>
      </Container>
      <hr />
      <ContainerFooter>
        <button onClick={onSave} className="btn dark btn-sm bold uppercase">
          salvar
        </button>
      </ContainerFooter>
    </>
  );
};
