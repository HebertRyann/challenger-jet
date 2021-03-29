import React from 'react';
import { TooltipComponent } from '../../../../../../../../components/TooltipComponent';
import { Container } from './style';

export const labelDetails = 'Detalhes';
export const nameDetails = '@@tabs-details';

export const Details = (): JSX.Element => {
  return (
    <Container>
      <div className="row">
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Peso (kg)"
            message="Infome o peso em kg"
          />
          <input className="form-control" type="text" placeholder="0,00" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Largura (m)"
            message="Informe a largura em metros"
          />
          <input className="form-control" type="text" placeholder="0,00" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Altura (m)"
            message="Informe a altura em metros"
          />
          <input className="form-control" type="text" placeholder="0,00" />
        </div>
        <div className="form-content col-md-3">
          <TooltipComponent
            label="Comprimento (m)"
            message="Informe a comprimento em metros"
          />
          <input className="form-control" type="text" placeholder="0,00" />
        </div>
      </div>
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
