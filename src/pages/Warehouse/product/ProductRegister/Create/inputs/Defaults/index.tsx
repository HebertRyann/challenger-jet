import React from 'react';
import Input from '../../../../../../../components/Input';
import { Container } from './style';

export const DefaultInputs = (): JSX.Element => {
  return (
    <Container>
      <hr />
      <div className="row">
        <div className="form-content col-md-12">
          <div className="form-group">
            <label>Descrição e detalhes</label>
            <textarea className="form-control" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="form-content col-md-12">
          <div className="form-group">
            <label>Especificação Técnica</label>
            <textarea className="form-control" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="form-content col-md-12">
          <div className="form-group">
            <label>Forma de utilização</label>
            <textarea className="form-control" />
          </div>
        </div>
      </div>
    </Container>
  );
};
