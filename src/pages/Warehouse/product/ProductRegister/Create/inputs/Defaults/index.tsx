import React from 'react';
import Input from '../../../../../../../components/Input';
import { Container } from './style';

export const DefaultInputs = (): JSX.Element => {
  return (
    <Container>
      <hr />
      <div className="row">
        <div className="form-content col-md-3">
          <Input
            value={'Input default'}
            name="category"
            className="form-control"
            label="Descrição e detalhes"
          />
        </div>
        <div className="form-content col-md-3 ">
          <Input
            value={'Input default'}
            name="category"
            className="form-control"
            label="Especificação Técnica"
          />
        </div>
        <div className="form-content col-md-3">
          <Input
            value={'Input default'}
            name="category"
            className="form-control"
            label="Forma de utilização"
          />
        </div>
      </div>
    </Container>
  );
};
